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
            rm -rf /var/www/chargehub/*
            
            cp index.html /var/www/chargehub/
            cp products.html /var/www/chargehub/
            cp product-details.html /var/www/chargehub/
            cp about.html /var/www/chargehub/
            cp contact.html /var/www/chargehub/
            cp faq.html /var/www/chargehub/
            cp offers.html /var/www/chargehub/

            cp -r css /var/www/chargehub/
            cp -r js /var/www/chargehub/

            chown -R jenkins:jenkins /var/www/chargehub
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
