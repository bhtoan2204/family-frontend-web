pipeline {
    agent any

    tools {
      nodejs 'NodeJs Environment'
    }

    options {
      skipDefaultCheckout(true)
      disableConcurrentBuilds()
    }

    environment {
        SSH_password = credentials('SSH-password')
        SSH_user = credentials('SSH_user')
        SSH_ip = credentials('SSH_ip')
    }

    stages{
        stage("Checkout") {
            steps {
                checkout scm
            }
        }

        stage("SonarQube Analysis") {
            steps {
                script {
                  def scannerHome = tool 'SonarQube-Scanner';
                  withSonarQubeEnv('SonarQube-Server-Frontend') {
                    sh "${tool("SonarQube-Scanner")}/bin/sonar-scanner -Dsonar.projectKey=Family-Frontend-Web"
                  }
                }
            }
        }

        stage("Build Docker Images") {
            steps {
                script {
                  sh "docker compose build"
                }
            }
        }

        stage("Push Docker Images to Docker Hub") {
            steps {
                script {
                    withCredentials([usernamePassword(credentialsId: 'Dockerhub Credentials', usernameVariable: 'USERNAME', passwordVariable: 'PASSWORD')]) {
                        sh "echo ${PASSWORD} | docker login --username ${USERNAME} --password-stdin"
                        sh "docker compose push"
                    }
                }
            }
        }

        stage("Deploy to Kubernetes") {
          steps {
            sh "sshpass -p ${SSH_password} ssh ${SSH_user}@${SSH_ip} 'kubectl rollout restart deployment nextjs-deployment'"
          }
        }

        stage("Clean up") {
            steps {
                sh "docker rmi $(docker images -f "dangling=true" -q)"
            }
        }
    }
}
