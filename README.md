# 2020-2-OSSP1-ProblemBank-3
## About
기존의 문제은행 시스템에 온라인 시스템 기능을 추가하였습니다.

## Preview
image

## Getting Started
#### 혹시 Windows 유저신가요?
problembank-client의 package.json 파일을 열어주세요.
30번째 줄의 `export PORT=5112`를 `set PORT=5112`로 바꿔주세요.

#### terminal 실행
terminal을 실행하고 problembank-client로 경로를 이동해주세요.

#### npm을 이용한 세팅
`npm install`<br>`npm start`<br>
npm install 명령어로 node modules를 모두 설치해주세요.

#### 반복
problembank-server로 경로를 이동한 다음 **npm을 이용한 세팅**을 한번 더 반복해주세요.

#### mysql db 설정
problems 데이터베이스를 생성해주세요.
<br>problembank-server의 .env파일에 db 설정을 해주세요.
<br>`mysql -u root -p problems < Dump20201217.sql`을 실행하여 db 테이블을 생성해주세요.

#### Docker 설치
[Docker](https://www.docker.com/get-started) 홈페이지에서 안내에 따라 Docker를 다운받아주세요.
<br>Docker를 한번 실행시켜 초기 설정을 해주세요.
<br>terminal을 실행하여 problem-server/docker 폴더로 이동한 후, `bash build.sh`을 입력하여 Docker에 이미지를 올려주세요.
<br>Windows의 경우 build.bat을 실행해주세요.

#### 끝!
`http://localhost:5112`로 접속하여 작업하시면 됩니다.
