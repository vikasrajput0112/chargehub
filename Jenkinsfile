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
