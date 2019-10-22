# [Test script] TDD & BDD
 
. 

# TDD
***
### 먼저 개발을 하고 테스트를 하는 기존 방식이 아닌 테스트 코드를 작성하고 검증된 코드를 실제 코드로 반영하자는 개념은 수 많은 개발자들의 호응을 거쳐 현재는 Agile의 대표적인 개발방법론이 되었다.
### 하지만 설계 개선, 자동화된 테스트 유닛, 검증된 코드로 인한 안정성 등 수많은 장점을 가지고도 TDD는 다음과 같은 벽과 마주쳤다.
   
 - Where to start in the process : **[프로세스의 어디서 부터 시작해야 하는가]**
 - What to test and what not to test : **[무엇을 테스트하고 또 무엇을 하지 말아야 하는가]**
 - How much to test in on go : **[한번에 얼마만큼 테스트해야 하는가]**
 - What to call the tests : **[테스트를 어떻게 명명해야 하는가]**
 - How to understand why a test fails : **[왜 테스트가 실패 하는 지에 대해 어떻게 이해해야 하는가]**

.

# BDD
***
### BDD의 핵심은 TDD의 이러한 이슈들을 처리하는 동안 함께해온 Unit testing 및 Acceptance testing에 대한 접근의 재 해석에서 비롯되었다.
### 전통적인 TDD 소프트웨어 개발 방법론에서 개발자들은 다음의 흐름을 따른다.

 - 먼저 유닛을 위한 테스트 셋을 정의한다.
 - 유닛을 구현한다.
 - 마지막으로 유닛에 대한 구현이 테스트를 통과하는지 검증한다.
 
### 위의 정의는 각 유닛들에게 기대되는 행위들에 대해 명시적이지 않고 또 명세화 되어있지 않았다. 이에 반해 BDD는 소프트웨어 내의 각 유닛에 대해 기대되는 행위들을 명세화하면서 출발한다.
 
 - 특정 값이 주어지고 **(Given)**
 - 어떤 이벤트가 발생했을 때 **(When)**
 - 그에 대한 결과를 보장해야한다 **(Then)**
 
### 하지만 여기서 한가지 의문이 생긴다. 과연 위의 내용만 보아서는 TDD와 BDD가 도대체 어떻게 다른것인가? 
### 이에 대해 Dan north는 다음과 같이 이야기했다.

### “당신이 조그마한 개발팀에 있고 당신과 일하는 대상이 모두 개발자들이라면 그것이 궂이 BDD일 필요는 없다. 왜냐하면 BDD는 TDD 사용자들의 공식화된 좋은 습관들 위에 형성되었기 때문이다. 하지만 BDD는 개발자의 언어로 이루어지는 TDD에 반해 테스트 시나리오를 읽는 대상이 좀 더 넓혀진 개념이다." 라고 말이다.

### 그렇다면 과연 좋은 습관은 어떤 것이며 시나리오를 읽는 대상이 넓혀진 개념이라는 것은 무엇을 말하는걸까? 그것은 다음과 같다.

 - Outside-in 개념으로 작성하고 비즈니스 또는 조직적인 목표(?)로 시작하라.
 - 요구 사항을 분명히 한 예제를 이용하라.
 - Ubiquitouse language를 이용해서 개발하라.
 
### 근래의 프로젝트에 이르면서 협업의 중요성이 나날이 강조되고 있다. 개발자와 비 개발자 모두 쉽게 이해할 수 있는 표현을 사용한다는 것은 양쪽 모두에게 상당한 이익을 가져다준다.
### 다음은 대표적인 BDD 프레임워크인 JBehave에서의 테스트 시나리오의 예시이다. 
 
 [Scenario 1: Refunded items should be returned to stock]
 
 - ** Given : ** a customer previously bought a black sweater from me And I currently have three black sweaters left in stock
 
 - ** When : ** he returns the sweater for a refund
 
 - **Then : ** I should have four black sweaters in stock
 
### Given, When, Then의 흐름으로 각 유닛에 대한 시나리오를 기술하는 JBehave는 위의 예시에서도 볼 수 있듯이 특정 유닛에게 기대되는 행위들이 잘 명세화되어있다.
### 그것도 누구나 알아볼 수 있는 언어로 말이다. 이러한 방법으로 BDD는 프로젝트내에서 서로 다른 업무를 가지고 있는 구성원들 간의 커뮤니케이션의 용도로 발전했다. 

.

***

### 참조

 - INTRODUCING BDD
 
   <https://dannorth.net/introducing-bdd/>

 - TDD vs BDD

   <http://blog.mattwynne.net/2012/11/20/tdd-vs-bdd/>


 
 
 