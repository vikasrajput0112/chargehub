pipeline {

    agent any

    stages {

        stage('Validate') {
            steps {
                echo 'Validating ChargeHub website...'

                sh '''
                    test -f index.html
                    test -f products.html
                    test -f product-details.html
                    test -f about.html
                    test -f contact.html
                    test -f css/style.css
                    test -f js/script.js
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
                          -Dsonar.projectKey=Chargehub \
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

        stage('Deploy to Nginx') {
            steps {
                echo 'Deploying ChargeHub website to Nginx...'

                sh '''
                    rm -rf /var/www/chargehub/*

                    cp -r index.html \
                          products.html \
                          product-details.html \
                          about.html \
                          contact.html \
                          css \
                          js \
                          /var/www/chargehub/
                '''
            }
        }
    }

    post {

        success {
            echo 'ChargeHub website deployed successfully!'
        }

        failure {
            echo 'ChargeHub deployment failed!'
        }

    }
}
