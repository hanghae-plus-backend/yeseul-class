# Apply Class Module
***

## ERD

![alt text](image.png)

## 디렉토리 구조
.
├── app.controller.spec.ts. 
├── app.controller.ts.  
├── app.module.ts.  
├── app.service.ts.  
├── classReservation.  
│   ├── class.module.ts.  
│   ├── controllers.  
│   │   ├── class.controller.ts.  
│   │   └── classReservation.controller.ts.  
│   ├── dto.  
│   │   ├── applyClass.dto.ts.  
│   │   ├── createClass.dto.ts.  
│   │   └── createClassReservation.dto.ts.  
│   ├── entities.  
│   │   ├── class.entity.ts.  
│   │   └── classReservation.entity.ts.  
│   ├── repositories.  
│   │   ├── class.repository.interface.ts.  
│   │   ├── class.repository.ts.  
│   │   ├── classReservation.repository.interface.ts.  
│   │   └── classReservation.repository.ts.  
│   └── service.  
│       ├── classReservation.service.ts.  
│       └── classReservation.validator.ts.  
└── main.ts.  
## Think About...

      ### 특강에 대한 조건1:  한 유저는 하나의 클래스를 1번만 신청할 수 있다.
      ### 특강에 대한 조건2: transaction이 중요하고 30명이 안찼는지 확실히 확인이 된 이후에 신청할 수 있다.
      ### 특강에 대한 조건3: 성공했으면, is_success결과를 True로 반환하고
      ### 특강에 대한 조건4: 유저의 이유로 실패하면 is_success의 결과를 ㅠ로 반환하고 그 그 detail도 적음
      ### 특강에 대한 조건5: 그냥 트랜젝션 실패면 rollBackTransaction
      

## 구조

1. 엔티티
2. 리포지토리 (리포지토리와 엔티티 사이에 인터페이스)
3. 서비스
4. 컨트롤러


## 코드 컨벤션

1) 폴더명: 카멜케이스
2) 파일명: 카멜케이스_파일명.디렉토리명.ts
3) 디렉토리 구조:
    - 모듈 : [controllers, dto, entities, repositories, service] 
4) 클래스명: 파스칼케이스
5) 함수명: 카멜케이스
6) 클라이언트에서 받는 변수명: 스네이크 케이스
7) db테이블 칼럼명: 스네이크 케이스

- 최대한 코드컨벤션은 node 기본 코드컨벤션을 따르되, db 테이블 칼럼명 등은 현업에서 익숙한 방식을 따랐습니다. 코드컨벤션은 모두가 동의하는 방식을 따르는게 중요하다고 생각합니다.

- 디렉토리 구조는 클린 아키텍쳐로 도메인과 서비스레이어, 컨트롤러를 확실히 구분할 것을 생각했습니다. 각 레이어를 단순 파일이 아닌 디렉토리로 구분하면 더 쉽게 눈에 보일 것이라 생각했습니다.


## 테스트 시나리오 -> 설계-> 코딩 관련 전략들
### TDD 방법론과 설계의도를 소화한 방식
TDD를 너무 강박적으로 하면 현업에 맞지 않게 비효율적이 될거라고 생각했습니다.
제가 신경쓴 포인트는 1개 업무 단위마다 그에 적합한 테스트 코드를 느슨하게 동시에 작성했습니다.
테스트 코드는 서비스 단의 유닛테스트와 컨트롤러 단의 e2e 테스트로 크게 분류했습니다.
1) 간략하게 완성되지 않은 controller 단의 함수를 만든다. 혹은 서비스 단의 함수가 될 수도 있음.
2) 해당 함수에서 생길 수 있는 각 케이스들을 떠올려본다.
3) 테스트 코드를 작성하고 에러가 생기는걸 확인한다.
4) 함수를 완성해서 에러가 생기지 않는것을 확인하고 다음 함수로 넘어간다. 

### SOLID 원칙을 지키는 지에 대한 설명 포함
S - Single Responsibility Principle (단일 책임 원칙):
O - Open/Closed Principle (개방-폐쇄 원칙):
L - Liskov Substitution Principle (리스코프 치환 원칙)
I - Interface Segregation Principle (인터페이스 분리 원칙)
D - Dependency Inversion Principle (의존성 역전 원칙)

## 내가 생각하는 clean code는 무엇인가?
clean code는 궁극적으로 사람이 읽기 쉬운 코드입니다.
컴퓨터의 처리 속도는 매 순간 진화하지만 인간이 코드를 읽는 속도와 능력은 그렇지 못합니다.
나를 위해 그리고 같이 일하는 동료들을 위해 읽기 쉬운 코드, 그리고 수정하기 쉬운 코드가 중요하고, 
읽기 쉬운 코드를 위해서는 적절한 변수명 사용, 적절한 함수화 그리고 클래스화가 필요할 것입니다.
수정하는 것도 중요합니다. 코드의 층위를 분리해서 수정이 필요하다면 필요한 부분만 타게팅해서 수정할 수 있도록 하는게 중요합니다.
