pipeline {
    agent { label 'docker-slave-0' }

    environment {
        FRONTEND_IMAGE = "public.ecr.aws/a9o4o2s3/jack-frontend"
        BACKEND_IMAGE  = "public.ecr.aws/a9o4o2s3/jack-backend"
        K8S_DIR = "jack-trades-main/k8s"
    }

    stages {

        stage('Checkout Code') {
            steps {
                git branch: 'main',
                    url: 'https://github.com/SamaMostafa03/Containerized-Item-Exchange-Application'
            }
        }
        stage('Build Frontend Image') {
            steps {
                dir('jack-trades-main') {
                sh '''
                    # build using Dockerfile.frontend and context = client/
                    docker build -f Dockerfile.frontend -t $FRONTEND_IMAGE:latest ./client
                '''
                }
            }
        }

        stage('Build Backend Image') {
            steps {
                dir('jack-trades-main') {
                sh '''
                    # build using Dockerfile.backend and context = server/
                    docker build -f Dockerfile.backend -t $BACKEND_IMAGE:latest ./server
                '''
                }
            }
        }

        stage('Push Images to Public ECR') {
            steps {
                sh '''
                docker push $FRONTEND_IMAGE:latest
                docker push $BACKEND_IMAGE:latest
                '''
            }
        }

        stage('Deploy to K3s') {
            steps {
                withKubeConfig(credentialsId: 'k3s-kubeconfig') {
                    sh """
                    kubectl apply -f $K8S_DIR
                    """
                }
            }
        }
    }
}
