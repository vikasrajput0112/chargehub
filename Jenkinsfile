pipeline {

    agent any

    stages {

       stage('Validate') {
    steps {
        echo 'Validating ChargeHub website...'

        sh '''
            test -f index.html
            test -f css/style.css
            test -f js/script.js
        '''
    }
}
/* stage('SonarQube Analysis') {
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
*/
stage('Deploy to Nginx') {
    steps {
        echo 'Deploying ChargeHub website to Nginx...'

        sh '''
            echo "Cleaning old ChargeHub website files..."

            rm -rf /var/www/chargehub/about.html
            rm -rf /var/www/chargehub/contact.html
            rm -rf /var/www/chargehub/faq.html
            rm -rf /var/www/chargehub/offers.html
            rm -rf /var/www/chargehub/product-details.html
            rm -rf /var/www/chargehub/products.html

            rm -rf /var/www/chargehub/css
            rm -rf /var/www/chargehub/js

            rm -f /var/www/chargehub/index.html

            echo "Copying new one-page website..."

            echo "Copying ChargeHub website..."



            

            cp index.html /var/www/chargehub/
            cp index.html /var/www/chargehub/
            cp Laptop-Charger.html /var/www/chargehub/
            cp -r css /var/www/chargehub/
            cp -r css /var/www/chargehub/
            cp -r js /var/www/chargehub/

            cp -r js /var/www/chargehub/

            echo "ChargeHub website deployed successfully."
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
