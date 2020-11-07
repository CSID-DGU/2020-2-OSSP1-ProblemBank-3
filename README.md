# 2020-2-OSSP1-ProblemBank-3

## How to Run this Project
#### 혹시 윈도우 유저신가요?
problembank-client의 package.json 파일을 열어주세요.
30번째 줄의 `export PORT=5112`를 `set PORT=5112`로 바꿔주세요.

#### terminal 실행
terminal을 실행하고 problembank-client로 경로를 이동해주세요.

#### npm을 이용한 세팅
`npm install`<br>`npm start`<br>
npm install 명령어로 node modules를 모두 설치해주세요.

#### 반복
problembank-server로 경로를 이동한 다음 **npm을 이용한 세팅**을 한번 더 반복해주세요.

#### MySQl Dump import
terminal을 실행하여 Dump20201107.sql 파일이 있는 경로로 이동해주세요.<br>mysql을 실행시켜 `CREATE DATABASE problems`를 입력해 problems database를 만들어주세요.
<br>`mysql -u [userID] -p [password] problems < dump20201107.sql`을 입력하여 import 해주세요.

#### Docker 설치
[Docker](https://www.docker.com/get-started) 홈페이지에서 안내에 따라 Docker를 다운받아주세요.
<br>Docker를 한번 실행시켜 초기 설정을 해주세요.
<br>terminal을 실행하여 problem-server/docker 폴더로 이동한 후, `bash build.sh`을 입력하여 Docker에 이미지를 올려주세요.
<br>이미지는 git pull해올 때마다 삭제하고 새로 빌드해주세요. 수정된 부분이 있을수도 있습니다.

#### 끝!
`http://localhost:5112`로 접속하여 작업하시면 됩니다.
