pipeline {

    agent any

    stages {

        stage('Checkout') {
            steps {
                checkout scm
            }
        }

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
                    sudo rm -rf /var/www/chargehub/*
                    sudo cp -r . /var/www/chargehub/
                    sudo chown -R www-data:www-data /var/www/chargehub
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
