# 주제 : 동물병원 예약 시스템 ( DEVELOP 브랜치를 봐주십쇼!! )
## [노션](https://reinvented-bamboo-5d0.notion.site/2-c3a16f18d54141bb9fb72e2d0c1cd8e9?pvs=4)
동물 병원 예약 시스템은 반려동물 소유자들이 편리하게 병원 예약을 할 수 있는 웹 애플리케이션입니다. 
이 시스템을 통해 사용자들은 온라인으로 병원 예약을 신속하게 처리할 수 있고, 예약 확인, 변경 및 취소 등의 기능을 손쉽게 이용할 수 있습니다. 
프로젝트는 Nest.js와 TypeORM을 사용하여 백엔드를 구축하였으며, MySQL 데이터베이스와의 연동을 통해 예약 정보를 안전하게 관리합니다.

# 팀원 및 제공 기능
- 팀장 김재준 @KJJDSA
  - 회원가입, 로그인, 인증
- 박세진 @codesejin
  - 결제, 알림
- 이재철 @codeing999
  - 진료 예약/조회/수정/삭제
 
# 스택
- 언어 : TypeScript
- 프레임워크 : NestJS
- ORM : TypeORM
- DBMS : MySQL

# 로컬 실행 방법(Getting Started)

```
npm run start:dev
```

# git repository 브랜치 전략

- **main 브랜치**: 기본 브랜치로서 제품의 안정 버전을 관리합니다. 직접적인 코드 변경은 허용되지 않으며, 배포 시에만 업데이트됩니다.

- **develop 브랜치**: 개발 작업의 중심이 되는 브랜치입니다. 개발자들은 이 브랜치에서 작업을 진행하며, 기능 개발, 버그 수정 등의 작업을 수행합니다.

- ***feature/* 브랜치**: 새로운 기능 추가나 기존 기능 개선을 위해 생성되는 브랜치입니다. 예를 들어, /feature/alarm 브랜치는 알람 기능에 대한 작업을 수행하기 위해 생성됩니다.

- **작업 완료 후 develop 브랜치로 병합**: 개발이 완료된 기능 브랜치들은 develop 브랜치로 병합됩니다. 이를 통해 여러 기능들이 통합되고, 테스트와 리뷰 등을 거쳐 개발 버전이 완성됩니다.

이러한 브랜치 전략을 통해 우리는 개발 과정을 체계적으로 관리하고, 기능별로 병렬적인 작업을 진행할 수 있습니다. 코드 변경은 각자의 기능 브랜치에서 이루어지며, 최종적인 안정 버전은 main 브랜치에 반영됩니다.








# 폴더 구조

```
src                                        
├─ __tests__                               
│  ├─ controller.test.ts                                      
│  ├─ service.test.ts                                              
│  └─ repository.test.ts                                   
├─ module                                  
│  └─ moduleA                                                      
│     ├─ api                               
│     │  ├─ controller.ts
│     │  └─ dto.ts  
│     ├─ data
│     │  ├─ db.ts 
│     │  └─ entity.ts                                                                    
│     ├─ domain                            
│     │  ├─ model.ts
│     │  ├─ repository.ts
│     │  └─ service.ts                                           
│     ├─ error.ts                             
│     ├─ mapper.ts                                    
│     └─ module.ts                                                              
├─ package.json                    
├─ tsconfig.json                 
├─ .gitignore              
└─ .env                                
```

# swagger

<img width="1422" alt="image" src="https://github.com/plus-tdd/animalNest/assets/101460733/bdbe0b74-aac9-489e-8fd1-4c5d1db2d7e4">

