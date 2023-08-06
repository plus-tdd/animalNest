# VetHub : 동물병원 예약 시스템

> **TDD기반 서버 구축, CI+CD / AutoScaling, 통합 모니터링, 장애대응**


반려동물 소유자들이 편리하게 병원 예약을 할 수 있는 웹 애플리케이션입니다. 

이 시스템을 통해 사용자들은 온라인으로 병원 예약을 신속하게 처리할 수 있고, 예약 확인, 변경 및 취소 등의 기능을 손쉽게 이용할 수 있습니다. 


<br>

## 🏗️ 아키텍처

<p align="center">
  <img width="700" alt="image" src="https://github.com/plus-tdd/animalNest/assets/101460733/2d814a85-9f6c-4578-a9f4-3a958efc62ab">
</p>

<br>

## 🧑‍🤝‍🧑 팀원 및 제공 기능 ([팀 노션](https://reinvented-bamboo-5d0.notion.site/2-c3a16f18d54141bb9fb72e2d0c1cd8e9?pvs=4))
<div style="display: flex;">
  <table>
    <tr>
      <th>팀원</th>
      <th>제공 기능</th>
      <th>Github</th>
    </tr>
    <tr>
      <td>팀장 : 김재준</td>
      <td>회원가입, 로그인, 인증</td>
      <td>@KJJDSA</td>
    </tr>
    <tr>
      <td>박세진</td>
      <td>결제, 알림</td>
      <td>@codesejin</td>
    </tr>
    <tr>
      <td>이재철</td>
      <td>진료 예약/조회/수정/삭제</td>
      <td>@codeing999</td>
    </tr>
  </table>
  <img src="https://github.com/plus-tdd/animalNest/assets/101460733/e553cb11-610f-4447-99b4-faf5ec8338ff" alt="팀 이미지" width="300">
</div>

<br>

## 🧑‍💻 스택

#### **Tech Stack**

- **TypeScript**
- **Nest.js**
- **MySQL**
- **TypeORM**
- **Jest**
- **Seeder**
- **Winston**
- **JWT**

#### **CI/CD**

- **GitHub Action**
- **Docker**

#### **Infrastructure**

- **AWS ECR** (Elastic Container Registry)
- **AWS ECS** (Elastic Container Service)
- **AWS Fargate**
- **RDS MySQL** (Relational Database Service)
- **Load Balancer**
- **CloudWatch** (Logs, Alarm)
- **SNS** (Simple Notification Service)
- **Lambda**
- **Slack**

#### **Load Test**

- **JMeter**


<br>

## 🧪 로컬 실행 방법(Getting Started)

```
npm run start:local
npm run start:dev
```

<br>

## ⏳ git repository 브랜치 전략

- **main:** 배포용 서비스 코드가 있는 메인 브랜치로, 항상 현재 서비스 상태를 반영해야 합니다.

- **develop:** 다음 릴리스를 위해 최신 개발이 진행되는 개발 브랜치입니다.

- **feature 브랜치:** 새로운 기능 개발에 사용되는 브랜치입니다. develop 브랜치에서 생성되며, 기능 개발이 완료되면 develop 브랜치에 병합됩니다.

- **hotfix 브랜치:** 빠르게 코드를 수정하는 데 사용되는 브랜치입니다. develop 브랜치에서 생성되며, 수정이 완료되면 main develop 브랜치에 병합됩니다.

이러한 브랜치 전략을 통해 저희는 개발 과정을 체계적으로 관리하고, 기능별로 병렬적인 작업을 진행할 수 있습니다. 코드 변경은 각자의 기능 브랜치에서 이루어지며, 최종적인 안정 버전은 main 브랜치에 반영됩니다.

<br>

## 🚛 디렉토리 구조

```
src                                        
├─ __tests__ //유닛테스트 디렉토리
│  └─ moduleA    
│     ├─ service.test.ts //모듈A의 서비스 테스트코드
│     └─ repository.test.ts //모듈A의 레포지토리 테스트코드
├─ module                                  
│  ├─ moduleA                                                      
│  │  ├─ api                               
│  │  │  ├─ controller.ts
│  │  │  └─ dto.ts  
│  │  ├─ data
│  │  │  ├─ db.ts //실제 레포지토리
│  │  │  └─ entity.ts                                                                    
│  │  ├─ domain                            
│  │  │  ├─ model.ts
│  │  │  ├─ repository.ts //인터페이스로 구현된 레포지토리
│  │  │  └─ service.ts                                           
│  │  ├─ error.ts                             
│  │  ├─ mapper.ts                                    
│  │  └─ module.ts
│  ├─ http-exception.filter.ts
│  ├─ logger.ts
│  ├─ response.ts
│  ├─ seeder.ts
│  ├─ app.module.ts
│  ├─ app.controller.ts
│  ├─ app.service.ts
│  └─ main.ts
├─ package.json                    
├─ tsconfig.json                 
├─ .gitignore              
└─ .env
                           
```
<br>

# 📃 swagger

<img width="700" alt="image" src="https://github.com/plus-tdd/animalNest/assets/101460733/a614e3fe-1f55-44e8-a9d0-a5c1d0e88108">
