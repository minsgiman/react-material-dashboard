# Responsive Web 구현

***

### 미디어 쿼리 (Media Queries)

 - 단말에게너는어떤종류의미디어니? 화면크기는얼마나되니? 라고 질문하는 것
 - 아래와 같은 형태의 미디어 쿼리를 작성하여 해당하는 경우 실행문을 적용한다.
 
        @media [only 또는 not] [미디어 유형] [and 또는,콤마] (조건문) {실행문}

 - 미디어 유형 : all, screen, tv, projection 등등...
 - 조건문 : width, height, device-width, device-height, color, resolution 등등... 
        
        /* 뷰포트가 320px 이상일때 */
        @media all and (min-width:320px) {
            body {
                background: #e65d5d;
            }
        }
        
        /* 뷰포트가 768px 이상일때 */
        @media all and (min-width:768px) {
            body {
                background: #2dcc70;
            }
        }

 - 스마트 기기는 기본으로 설정되어 있는 뷰포트 영역으로 인해 미디어 쿼리가 정상적으로 작동하지 않는 문제가 발생할 수 있다.
   이러한 문제를 방지하기 위해 뷰포트 메타 태그를 이용해서 화면의 크기나 배율을 조절 해야 한다.

        <!-- 뷰포트 메타 태그 -->
        <meta name="viewport" content="width=device-width, minimum-scale=1, initial-scale=1, user-scalable=yes">
 
.

### Fluid Grid

 - 웹 페이지가 화면의 크기에 관계없이 자유롭게 늘어나거나 줄어들 수 있도록 픽셀(px)대신 퍼센트(%)를 사용 하는것
 - em단위는 부모에 적용된 폰트 크기를 기준으로 계산한다. ex) 부모가 96px인데, 2em으로 지정하면 96 * 2 px가 됨
 - rem단위는 최상위, 즉 웹 문서의 시작인 <html>태그를 기준으로 하기 때문에 상속 문제가 발생하지 않음
 - vw단위는 (viewport width) 뷰포트의 너비를 100을 기준으로 하여 크기를 결정하는 단위. ex)5vw 뷰포트 넓이의 5%가 된다.

.

### Flexible Box

 - 박스의 배치, 순서 또한 유동적으로 변경할 수 있다.
 - 부모 박스에 display:flex; 속성을 적용하면, 자식 박스들이 Flexible Box로 작동한다.
 - 플렉스 아이템을 제어하기 위한 속성
        
        flex-direction : 플렉스 아이템의 배치 방향 설정
        flex-wrap: 여러 줄로 배치
        flex-flow: direction, wrap 동시 설정
        justify-content: 주축 방향으로 다양한 아이템 배치 방법 
        align-items: 교차축 방향으로 다양한 아이템 배치 방법 
        order : 배치 순서
        flex: 아이템 크기 늘이고 줄이기
 
.
 
### 반응형 웹의 장점과 단점

 - 장점은 한벌만으로 여러기기에 대응할 수 있어 유지보수가 간편하다.
 - 단점은 모바일등에서 필요하지 않은 리소스까지 로드하므로 성능문제를 야기할 수 있다.
   또한 복잡한 Grid 형태의 데이터 표현이 빈번한 경우 적합하지 않다.