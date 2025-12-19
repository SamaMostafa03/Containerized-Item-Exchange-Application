pipeline {
    agent { label 'docker-slave-0' }

    environment {
        IMAGE_TAG = "${BUILD_NUMBER}"
        FRONTEND_IMAGE = "public.ecr.aws/a9o4o2s3/jack-frontend"
        BACKEND_IMAGE  = "public.ecr.aws/a9o4o2s3/jack-backend"
        K8S_DIR = "jack-trades-main/k8s"
    }

    triggers {
        githubPush()
    }

    stages {

        stage('Checkout Code') {
            steps {
                checkout scm
            }
        }

        stage('AWS ECR Login') {
            steps {
                withAWS(credentials: 'aws-access-key', region: 'us-east-1') {
                    sh '''
                        aws ecr-public get-login-password --region us-east-1 | \
                        docker login --username AWS --password-stdin public.ecr.aws/a9o4o2s3
                    '''
                }
            }
        }

        stage('Build Frontend Image') {
            steps {
                dir('jack-trades-main') {
                    sh "docker build -f Dockerfile.frontend -t $FRONTEND_IMAGE:$IMAGE_TAG ."
                }
            }
        }

        stage('Build Backend Image') {
            steps {
                dir('jack-trades-main') {
                    sh "docker build -f Dockerfile.backend -t $BACKEND_IMAGE:$IMAGE_TAG ."
                }
            }
        }
         stage('Build Images in Parallel') {
            parallel {
                // Frontend build runs in parallel
                stage('Build Frontend') {
                    steps {
                        echo 'Building Frontend Image...'
                        dir('jack-trades-main') {
                            sh "docker build -f Dockerfile.frontend -t $FRONTEND_IMAGE:$IMAGE_TAG ."
                        }
                        echo 'Frontend build complete'
                    }
                }
                
                // Backend build runs in parallel (at the same time as frontend)
                stage('Build Backend') {
                    steps {
                        echo 'Building Backend Image...'
                        dir('jack-trades-main') {
                            sh "docker build -f Dockerfile.backend -t $BACKEND_IMAGE:$IMAGE_TAG ."
                        }
                        echo 'Backend build complete.'
                    }
                }
            }
        }

        stage('Push Images to Public ECR') {
            steps {
                sh """
                docker push $FRONTEND_IMAGE:$IMAGE_TAG
                docker push $BACKEND_IMAGE:$IMAGE_TAG
                """
            }
        }

        stage('Update K8s Image Tags') {
            steps {
                sh """
                sed -i 's|public.ecr.aws/.*/jack-frontend:.*|$FRONTEND_IMAGE:$IMAGE_TAG|g' $K8S_DIR/frontend-deployment.yaml
                sed -i 's|public.ecr.aws/.*/jack-backend:.*|$BACKEND_IMAGE:$IMAGE_TAG|g' $K8S_DIR/backend-deployment.yaml
                """
            }
        }

        stage('Deploy to K3s') {
            steps {
                withKubeConfig(credentialsId: 'k3s-kubeconfig') {
                    sh "kubectl apply -f $K8S_DIR"
                }
            }
        }
    }
    

    post {
        success {
            emailext(
                to: "samamostafa507@gmail.com",
                subject: "Jenkins Build SUCCESS: ${env.JOB_NAME} (#${env.BUILD_NUMBER})",
                body: """
                    <p> Build Succeeded!</p>
                    <p><b>Build:</b> ${env.BUILD_NUMBER}</p>
                    <p><b>Job:</b> ${env.JOB_NAME}</p>
                    <p>View Build: ${env.BUILD_URL}</p>
                """
            )
        }

        failure {
            emailext(
                to: "samamostafa507@gmail.com",
                subject: "Jenkins Build FAILURE: ${env.JOB_NAME} (#${env.BUILD_NUMBER})",
                body: """
                    <p>Build Failed!</p>
                    <p><b>Build:</b> ${env.BUILD_NUMBER}</p>
                    <p><b>Job:</b> ${env.JOB_NAME}</p>
                    <p>View Console Log: ${env.BUILD_URL}console</p>
                """
            )
        }
    }
    
}
