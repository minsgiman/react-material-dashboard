# Client side 렌더링과 Server side 렌더링

***

### 1. Client-side 렌더링까지 순서

  - 1) Download HTML
  - 2) Download Javascript
  - 3) Evaluate Javascript
  - 4) Fetch Data from API
  - 5) User see Content
   
.

### 2. Server-side 렌더링까지 순서
  
  - 1) Download HTML
  - 2) User see Content
   
.

### 3. Client-side 렌더링의 단점

   - Javascript 처리가 끝난 후에 UI가 보여지기 때문에 (ajax처리 등) **초기 UI 구동속도가 느리다.** (그 다음부터는 빠른 인터랙션의 성능을 보인다)
   - **검색엔진 최적화의 문제가 존재한다.** 대부분의 웹 크롤러, 봇들이 Javascript 파일을 실행시키지 못하기 때문에 HTML에서만 콘텐츠를 수집하게 되고
     Client-side에서 렌더링 되는 페이지를 빈 페이지로 인식하게 된다. (그러나 구글경우는 봇 자체에서 Javascript를 실행해서 문제가 안된다.)
   - **보안문제가 발생한다.** Server-side 렌더링에서는 사용자 정보 서버측에서 세션으로 관리하나, Client측에서는 쿠키말고 저장할 공간이 마땅치 않다.

.

### 4. Server-side 렌더링의 단점
 
   - 서버에서 처리에 들어가는 자원이 필요하다.
   - 사용자와 인터랙션하는 부분에서 문제가 있다. DOM조작에 있어서도 요청하는 과정과 엄청난 탐색비용이 든다. 
   
.
   
### 5. Client-side, Server-side 렌더링을 혼용하여서 사용

   - 초기 렌더링은 Server-side에서 그 이후는 Client-side에서
   - 이 때 일관성을 보장하기 위해 서버측과 클라이언측은 똑같은 렌더링 코드를 공유해야 한다. (react의 Isomorphic Javascript 개념)

   
   
   