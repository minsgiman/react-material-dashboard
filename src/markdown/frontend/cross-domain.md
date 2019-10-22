

# 해결방법 1. Cross Domain Proxy

***

Javascript에서 동일 도메인 서버의 URL을 호출하고 이 URL에서 내부적으로 다른 도메인의 URL을 호출한다.

![object](./../images/develop/proxy.png "object")

이 방법의 장점은

 - 호출하는 전체 생명주기를 제어할 수 있다.

 - 클라이언트에게 반환하기 전 뭔가 처리할 게 있으면 원격 서버에서 받은 데이터를 파싱할 수도 있다.

 - 뭔가 에러가 발생하면 원하는 방법으로 에러를 처리할 수도 있다.

 - 마지막으로 모든 원격 호출에 대해 로깅을 할 수도 있다.

.

# 해결방법 2. JSONP

***

JSONP는 동일출처원칙을 회피하기 위해 <script> 요소를 이용한다.

<script> 태그는 same-origin-policy (SOP) 정책에 속하지 않는다는 사실을 근거로, 서로 다른 도메인간의 javascript 호출을 위하여 jsonp (또는 json with padding) 이 사용되었다.

### 1) 클라이언트 코드

 - <script> 요소를 생성하여 <body> 요소 아래에 추가

![object](./../images/develop/jsonp-client.png "object")

### 2) 서버 코드

 - GET 파라미터 callback을 통해 전달받은 이름의 함수를 호출하는 자바스크립트 코드를 출력
 
 - 그리고 그 함수의 인자로, 검색한 결과를 담은 배열이 들어간다.

![object](./../images/develop/jsonp-server.png "object")

### 3) JSONP 구조

 - 데이터를 요청할 페이지에, 데이터를 받아 처리할 콜백 함수를 먼저 준비해놓는다. 그 후에 <script> 요소를 생성하여, 데이터 요청을 한다.
 
 - 데이터 요청을 받은 페이지에서는 콜백 함수를 실행하는 스크립트를 출력한다. 이 때 callback 함수의 인자에는 요청받은 데이터가 들어가게 된다.

 - Ajax와 비교하여 JSONP가 가지는 한계도 나타나는데, 바로 GET Method만을 사용할 수 있다는 점. JSONP가 <script>요소를 사용하기 때문에.. 
 
 - 또한 error콜백 역시 사용할 수 없다.
  
![object](./../images/develop/jsonp.png "object")

.

# 해결방법 3. CORS (Cross-Origin Resource Sharing)

***

교차 출처 자원 공유(cross-origin resource sharing) 방식은 요청을 받은 웹서버가 허용 할 경우에는 다른 도메인의 웹 페이지 스크립트에서도 자원을 주고 받을 수 있게 해준다

 - 요청하려는 URL이 외부 도메인일 경우 웹 브라우저는 preflight요청 (사전요청)을 먼저 날리게 된다
 
 - preflight 요청은 실제로 요청하려는 경로와 같은 URL에 대해 OPTIONS 메서드로 요청을 미리 날려보고 요청을 할 수 있는 권한이 있는지 확인한다
 
 - Client가 받은 Response header에 **Access-Control-Allow-Origin**이 포함되어 날라온다.

![object](./../images/develop/cors-act.png "object")

.

# 해결방법 4. 개발단계에서 Browser 실행옵션을 크로스 도메인 정책을 해제하도록 변경할 수도 있다.

***

![object](./../images/develop/unset-cr.png "object")
