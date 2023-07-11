# 주제 : 동물병원 예약 시스템 ( DEVELOP 브랜치를 봐주십쇼!! )
## [노션](https://reinvented-bamboo-5d0.notion.site/2-c3a16f18d54141bb9fb72e2d0c1cd8e9?pvs=4)

# 팀원
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
