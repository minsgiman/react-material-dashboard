# 크롬 개발자 도구를 사용한 웹 성능분석

### 1. Performance탭에서 랜더링 과정 확인

![object](/images/develop/chrome_debug_performance.png "object")

1) 크롬 개발자 도구의 Performance 탭 선택

2) Start Profiling and Reload Page 클릭

3) 그래프 확인

 &nbsp;&nbsp;&nbsp; - (1) HTML load
 
 &nbsp;&nbsp;&nbsp; - (2) DOM Parse - HEAD영역 읽고 CSS, JS 요청
 
 &nbsp;&nbsp;&nbsp; - (3) CSS load 끝나면 CSS Parse
     
 &nbsp;&nbsp;&nbsp; - (4) HTML load 끝나면 DOMContentLoaded event
 
 &nbsp;&nbsp;&nbsp; - (5) Style
 
 &nbsp;&nbsp;&nbsp; - (6) Layout
 
 &nbsp;&nbsp;&nbsp; - (7) Paint
 
 &nbsp;&nbsp;&nbsp; - (8) Composite
<br><br>

### 2. Audits탭을 통한 웹 페이지 성능진단

![object](/images/develop/chrome_debug_audits.png "object")

* First Meaningful Paint (FMP)

 &nbsp;&nbsp;&nbsp; <https://developers.google.com/web/tools/lighthouse/audits/first-meaningful-paint>
  
 &nbsp;&nbsp;&nbsp; - (1) 주요 컨텐츠가 화면에 보여지는 시점을 의미
        
 &nbsp;&nbsp;&nbsp; - (2) 단순 레이아웃이나 로딩 이미지 등을 의미하는 것이 아님
        
 &nbsp;&nbsp;&nbsp; - (3) 주요 스타일이 적용되어 컨텐츠를 읽을 수 있는 상태
        
 &nbsp;&nbsp;&nbsp; - (4) 주요 컨텐츠를 노출하는데 필요한 CSS, JS가 로드 됨(Critical Rendering Path)
        
 &nbsp;&nbsp;&nbsp; - (5) 필요 : HTML + Style + 최소한의 Javascript
 <br>
        
* First Interactive (FI)

 &nbsp;&nbsp;&nbsp; <https://developers.google.com/web/tools/lighthouse/audits/first-interactive>

 &nbsp;&nbsp;&nbsp; - (1) 전부는 아니지만 대부분의 UI가 움직임
        
 &nbsp;&nbsp;&nbsp; - (2) 사용자의 입력에 대응에 일정 이간 이내에 동작함
        
 &nbsp;&nbsp;&nbsp; - (3) 부드럽지 않게 움직일 수 있음
        
 &nbsp;&nbsp;&nbsp; - (4) UI 동작에 필요한 JS로딩이 마무리 되었음
        
 &nbsp;&nbsp;&nbsp; - (5) 필요 : 이외의 기능이 동작하기 위한 리소스 로드, 현재 페이지의 Javascript, 폰트, 주요 이미지
 <br>
        
* Consistently Interactive (CI)

 &nbsp;&nbsp;&nbsp; <https://developers.google.com/web/tools/lighthouse/audits/consistently-interactive>

 &nbsp;&nbsp;&nbsp; - (1) 최소한 메인스레드가 50ms이내에 콘트롤을 확보화여 부드러운 반응 가능함
        
 &nbsp;&nbsp;&nbsp; - (2) 네트워크에서 다운로드 되고있는 리소스가 2개 이하
        
 &nbsp;&nbsp;&nbsp; - (3) 필요 : 화면 밖의 이미지, 다른 페이지의 리소스 프리로드
 <br>
        
* 다른 지표들        

 &nbsp;&nbsp;&nbsp; - (1) 현재는 FP, FCP보다는 FMP가 중요하며, TTI를 세분화 하여 FI, CI로 나누었다.
        
 &nbsp;&nbsp;&nbsp; - (2) 뭔가 진행되고 있구나 : FP, FCP
        
 &nbsp;&nbsp;&nbsp; - (3) 이제 원하는 내용을 읽을 수 있다 : FMP
        
 &nbsp;&nbsp;&nbsp; - (4) 이제 동작하는구나 : TTI
 <br>

* Lazy loading & SSR

 &nbsp;&nbsp;&nbsp; - (1) Lazy loading: FI, CI 향상

 &nbsp;&nbsp;&nbsp; - (2) Server side rendering: FMP 향상        
 <br>
 
* 크리티컬 렌더링 패스

 &nbsp;&nbsp;&nbsp; <https://developers.google.com/web/fundamentals/performance/critical-rendering-path/analyzing-crp>

 &nbsp;&nbsp;&nbsp; - (1) 웹 페이지를 화면에 처음 보여주기 위한 위한 "핵심 렌더링 과정"        
 <br><br>

### 3. Memory탭을 통한 Memory Leak 확인

![object](/images/develop/chrome_debug_memory.png "object")

* Take Heap Snapshot : Javascript Object and related DOM nodes

 &nbsp;&nbsp;&nbsp; - 1) snapshot을 뜬 후, 비교를 통해 변경된 메모리 세부 내역을 확인한다.

 &nbsp;&nbsp;&nbsp; - 2) Shallow Size : array, string와 같이 직접적으로 메모리를 점유하고 있는 JavaScript 객체들의 크기 실제 데이터가 있는 영역

 &nbsp;&nbsp;&nbsp; - 3) Retained Size : GC이후 남겨진 메모리의 크기. 즉, 실제 사용중인 JS Heap의 크기

* Record Allocation Profile : JS 함수별 메모리 사용량 파악시 용이 

* Record Allocation Timeline : 시간기준으로 할당과 해제 반복하여, 남겨진 메모리 확인

 <https://developers.google.com/web/tools/chrome-devtools/memory-problems/?hl=ko> 
 
 <http://www.dwmkerr.com/fixing-memory-leaks-in-angularjs-applications/>


