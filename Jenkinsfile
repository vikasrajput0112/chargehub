pipeline {

    agent any

    environment {
        ACR_REGISTRY = 'chargerhubacr.azurecr.io'
        IMAGE_NAME   = 'chargehub'
        IMAGE_TAG    = "${BUILD_NUMBER}"
    }

    stages {

        stage('Validate') {
            steps {
                echo 'Validating ChargeHub website...'

                sh '''
                    test -f index.html
                    test -f css/style.css
                    test -f js/script.js

                    echo "ChargeHub validation successful."
                '''
            }
        }

        stage('SonarQube Analysis') {
            steps {
                echo 'Running SonarQube analysis...'

                script {

                    def scannerHome = tool 'SonarScanner'

                    withSonarQubeEnv('SonarQube') {

                        withCredentials([
                            string(
                                credentialsId: 'sonar-token',
                                variable: 'SONAR_TOKEN'
                            )
                        ]) {

                            sh """
                                ${scannerHome}/bin/sonar-scanner \
                                  -Dsonar.projectKey=ChargeHub \
                                  -Dsonar.projectName=ChargeHub \
                                  -Dsonar.sources=. \
                                  -Dsonar.exclusions=.git/**,README.md,Jenkinsfile \
                                  -Dsonar.sourceEncoding=UTF-8 \
                                  -Dsonar.token=\${SONAR_TOKEN}
                            """
                        }
                    }
                }
            }
        }

        stage('Build Docker Image') {
            steps {
                echo "Building ChargeHub Docker image..."

                sh '''
                    docker build \
                      -t ${ACR_REGISTRY}/${IMAGE_NAME}:${IMAGE_TAG} \
                      -t ${ACR_REGISTRY}/${IMAGE_NAME}:latest \
                      .

                    echo "Docker image build successful."

                    docker images | grep chargehub
                '''
            }
        }

        stage('Trivy Image Scan') {
            steps {
                echo 'Scanning Docker image with Trivy...'

                sh '''
                    trivy image \
                      --severity HIGH,CRITICAL \
                      --exit-code 1 \
                      ${ACR_REGISTRY}/${IMAGE_NAME}:${IMAGE_TAG}

                    echo "Trivy scan completed successfully."
                '''
            }
        }

        stage('Login to Azure Container Registry') {
            steps {
                echo 'Logging in to Azure Container Registry...'

                withCredentials([
                    usernamePassword(
                        credentialsId: 'acr-credentials',
                        usernameVariable: 'ACR_USERNAME',
                        passwordVariable: 'ACR_PASSWORD'
                    )
                ]) {

                    sh '''
                        echo "$ACR_PASSWORD" | docker login \
                          ${ACR_REGISTRY} \
                          --username "$ACR_USERNAME" \
                          --password-stdin
                    '''
                }
            }
        }

        stage('Push Image to ACR') {
            steps {
                echo "Pushing ChargeHub image to ACR..."

                sh '''
                    docker push ${ACR_REGISTRY}/${IMAGE_NAME}:${IMAGE_TAG}
                    docker push ${ACR_REGISTRY}/${IMAGE_NAME}:latest

                    echo "Images pushed successfully."

                    echo "Versioned image:"
                    echo "${ACR_REGISTRY}/${IMAGE_NAME}:${IMAGE_TAG}"

                    echo "Latest image:"
                    echo "${ACR_REGISTRY}/${IMAGE_NAME}:latest"
                '''
            }
        }

        stage('Cleanup Docker') {
            steps {
                echo 'Cleaning temporary Docker resources...'

                sh '''
                    docker logout ${ACR_REGISTRY} || true

                    docker rm -f chargehub-test 2>/dev/null || true

                    docker image prune -f || true
                '''
            }
        }
    }

    post {

        success {
            echo """
            ==========================================
            ChargeHub Pipeline Successful
            ==========================================

            Docker Image:
            ${ACR_REGISTRY}/${IMAGE_NAME}:${IMAGE_TAG}

            Latest:
            ${ACR_REGISTRY}/${IMAGE_NAME}:latest

            ==========================================
            """
        }

        failure {
            echo 'ChargeHub pipeline failed!'
        }

        always {
            echo "Build Number: ${BUILD_NUMBER}"
        }
    }
}
