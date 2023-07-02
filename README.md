# 주제 : 동물병원 예약 시스템 ( DEVELOP 브랜치를 봐주십쇼!! )
동물 병원 예약 시스템은 반려동물 소유자들이 편리하게 병원 예약을 할 수 있는 웹 애플리케이션입니다. 
이 시스템을 통해 사용자들은 온라인으로 병원 예약을 신속하게 처리할 수 있고, 예약 확인, 변경 및 취소 등의 기능을 손쉽게 이용할 수 있습니다. 
프로젝트는 Nest.js와 TypeORM을 사용하여 백엔드를 구축하였으며, MySQL 데이터베이스와의 연동을 통해 예약 정보를 안전하게 관리합니다.

# 팀원 및 제공 기능 ([팀 노션](https://reinvented-bamboo-5d0.notion.site/2-c3a16f18d54141bb9fb72e2d0c1cd8e9?pvs=4))
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

# Pull Request (PR) 템플릿

우리는 코드 리뷰 과정을 원활하게 진행하기 위해 Pull Request (PR) 템플릿을 도입했습니다. 
새로운 PR을 생성할 때는 제공된 템플릿을 사용하여 필요한 모든 정보를 포함시키도록 해주세요. 
이를 통해 리뷰어가 변경 사항의 목적, 관련된 이슈, 프로젝트에 미치는 전반적인 영향을 이해할 수 있습니다. 새로운 PR을 생성하기 위해 다음 단계를 따라했습니다.

저장소에서 "Pull requests" 탭을 클릭합니다.
"New pull request" 버튼을 클릭합니다.
기준 브랜치와 비교 브랜치를 적절히 선택합니다.
"Create pull request" 버튼을 클릭합니다.
요청된 정보로 PR 템플릿을 작성합니다.
변경 사항을 검토한 후 "Create pull request" 버튼을 클릭합니다.
템플릿을 검토하고 정확하고 관련성 있는 정보를 제공해주시기 바랍니다. 이를 통해 리뷰 과정을 원활하게 진행할 수 있습니다.

# Issue 템플릿

새로운 이슈를 생성할 때 필요한 세부 정보를 포착하기 위해 이슈 템플릿을 도입했습니다. 
이를 통해 관련 정보를 미리 제공하여 문제를 정확하게 이해하고 해결할 수 있도록 돕습니다. 새로운 이슈를 생성하기 위해 다음 단계를 따라했습니다.

저장소에서 "Issues" 탭을 클릭합니다.
"New issue" 버튼을 클릭합니다.
사용 가능한 템플릿 중 적절한 이슈 템플릿을 선택합니다.
요청된 정보로 이슈 템플릿을 작성합니다.
세부 사항을 검토한 후 "Submit new issue" 버튼을 클릭합니다.
제공된 이슈 템플릿을 사용하고 가능한 많은 정보를 제공해주시기 바랍니다. 이를 통해 우리는 문제를 이해하고 신속하게 지원할 수 있습니다.

이러한 템플릿을 사용함으로써, PR과 이슈 모두에 대해 효율적이고 효과적인 협업을 개선하고 필요한 모든 정보가 PR과 이슈 작성 시 미리 제공되도록 하고자 합니다.

# swagger

<img width="1422" alt="image" src="https://github.com/plus-tdd/animalNest/assets/101460733/bdbe0b74-aac9-489e-8fd1-4c5d1db2d7e4">

