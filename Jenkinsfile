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

        stage('Login to ECR') {
            steps {
                withCredentials([
                    string(credentialsId: 'aws-access-key', variable: 'AWS_ACCESS_KEY_ID'),
                    string(credentialsId: 'aws-secret-key', variable: 'AWS_SECRET_ACCESS_KEY')
                ]) {
                    sh '''
                        aws configure set aws_access_key_id $AWS_ACCESS_KEY_ID
                        aws configure set aws_secret_access_key $AWS_SECRET_ACCESS_KEY
                        aws configure set default.region us-east-1

                        aws ecr-public get-login-password --region us-east-1 \
                        | docker login --username AWS --password-stdin public.ecr.aws/a9o4o2s3
                    '''
                }
            }
        }

        stage('Build Frontend Image') {
            steps {
                dir('jack-trades-main') {
                    sh "docker build -f Dockerfile.frontend -t $FRONTEND_IMAGE:latest ."
                }
            }
        }

        stage('Build Backend Image') {
            steps {
                dir('jack-trades-main') {
                    sh "docker build -f Dockerfile.backend -t $BACKEND_IMAGE:latest ."
                }
            }
        }

        stage('Push Images to Public ECR') {
            steps {
                sh """
                docker push $FRONTEND_IMAGE:latest
                docker push $BACKEND_IMAGE:latest
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
}
