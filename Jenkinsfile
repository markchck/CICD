pipeline{
    // agent 어떤 노예를 쓸 것인가?
    agent any

    triggers{
        pollSCM('*/3 * * * *')
    }
    
    // aws 
    environment{
      AWS_ACCESS_KEY_ID = credentials('aws-access-key-id')
      AWS_SECRET_ACCESS_KEY = credentials('aws-secret-access-key')
      AWS_DEFAULT_REGION = 'ap-northeast-2'
      HOME = '.'
    }

    // agent가 수행할 작업들 나열
    stages{
      // 필요한 레포지토리를 다운 받음
      stage('Prepare'){
        agent any
        
        // Prepare 스테이지에서 필요한 작업들 나열
        steps{
          // main 브랜치가 없으면 clone 수행 / 있으면 fetch 수행
          echo "Lets start Env : ${ENV}"
          echo 'Clonning Repository'
          git url : 'https://github.com/markchck/CICD',
          branch : 'main',
          credentialsId: 'gittest' //젠킨스에 secretManager에 등록한 git credentials 아이디
        }
        
        // steps 작업 끝나면 수행할 작업 post에서 나열
        post {
          success{
            echo 'Successfully Cloned Repository'
          }
          always{
            echo '성공 실패 여부와 상관 없이 항시 찍힘'
          }
          cleanup {
            echo 'Post 행위가 끝난 후에도 뭔가 행위를 하고 싶으면 cleanup 사용'
          }
        }

      }

      stage('Only for production'){
        // when 키워드를 사용하여 어떤 조건에서 수행할 것인지 설정
        when{
          branch 'production' // 브랜치가 production이고
          environment name: 'APP_ENV', value: 'prod'// APP_ENV 환경변수가 prod일 때
          anyOf{ // AND 조건 (다음 조건들 중 하나라도 TRUE면 수행)
            //DEPLOY_TO가 'production' 또는 'staging' 중 하나일 때
            environment name: 'DEPLOY_TO', value: 'production'
            environment name: 'DEPLOY_TO', value: 'staging'
          }
        }
        steps{
          echo 'This is only for production'
        }
      }


      // aws s3에 파일을 올림
      stage('Deploy Frontend'){
        steps{
          echo 'Deploying Frontend'

          // 프론트앤드 디렉토리의 정적 파일들을 S3에 올림. 젠킨스가 aws에 접근할 수 있는 ID와 Secret을 알고 있어야함.
          dir('./website'{ // dir 키워드로 website 디렉토리로 이동
            sh '''
            aws s3 sync . s3://jenkins-markchck
            '''
          })
        }

        post {
          success{
            echo 'Successfully S3에 업로드'
            mail to : 'markchck@gmail.com',
            subject : 'Deployed Frontend',
            body : 'Frontend Deployed Successfully'
          }

          failure{
            echo 'S3에 업로드 실패'
            mail to : 'markchck@gmail.com',
            subject : 'Failed to Deploy Frontend',
            body : 'Frontend Deploy Failed'
          }
        }
      }
    }
}
