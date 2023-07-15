FROM ubuntu:latest
LABEL authors="kjjdsa"

ENTRYPOINT ["top", "-b"]

# 베이스 이미지 선택
FROM node:18

# 작업 디렉토리 설정
WORKDIR /src

# 앱 종속성 설치
COPY package.json ./
RUN npm install

# 앱 소스 코드 복사
COPY . .

# 포트 노출
EXPOSE 3000

# mysql 서버가 실행되기 전에 앱이 실행되는것을 막아주는 스크립트래요. 이게 문제였던건 아닌것 같지만 사용했습니당
# ADD https://github.com/vishnubob/wait-for-it/raw/master/wait-for-it.sh /wait-for-it.sh
# RUN chmod +x /wait-for-it.sh

# 앱 실행 명령
CMD npm run start:seed