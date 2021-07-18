# Web App 성능 개선 참고

* [Detached window memory leaks](https://web.dev/detached-window-memory-leaks/?utm_source=google-io21&utm_medium=referral&utm_campaign=io21-resources)
    * window.open 또는 iframe 사용시 close 하더라도 window or iframe 객체참조 없애지 않으면 큰 메모리낭비
    * WeakRef 를 사용하는 방법

* [Improving React App Performance](https://medium.com/technogise/journey-of-improving-react-app-performance-by-10x-9195d4b483d4)
    * react 렌더 안에서 inline function 사용 안 하기
    * redux state 업데이트 하기 전에 변경이 있는지 비교하고 업데이트 하기
    * 조건부 렌더링 하기
    * API 호출은 Sequential 하게 하지 말고 Promise.all 을 사용하기

* [requestIdleCallback으로 초기 렌더링 시간 단축](https://engineering.linecorp.com/ko/blog/line-securities-frontend-4/)
    * lazy loading 을 requestIdleCallback 을 사용해서 해라 - 메인 스레드가 비어있을때 호출됨.

* [JavaScript SDK 성능개선 방법](https://engineering.linecorp.com/ko/blog/improve-javascript-sdk-performance/)
    * Tree shaking 개선
    * 자원 외부화로 번들 사이즈 감소 : url-loader -> file-loader 로 변경
    * 필요 없는 모듈 제외 
    * Dynamic Import와 모듈 chunk, Promise.all 조합

* [Analyzing app performance](https://3perf.com/blog/notion/)
    * JS 번들 로드 성능 분석, 측정
    * \_\_webpack_require\_\_ 가 차지하는 비용

* Preload and Prefetch
    * [리소스 우선순위 - preload, preconnect, prefetch](https://beomy.github.io/tech/browser/preload-preconnect-prefetch/)
    * [개츠비 프리로딩과 프리패치](https://jeonghwan-kim.github.io/dev/2020/08/21/gatsby-prefetch.html)
    * [Best-ish Practices for Dynamically Prefetching & Prerendering Pages with JavaScript](https://www.macarthur.me/posts/best-ish-practices-for-dynamically-prefetching-and-prerendering-with-javascript)

* [구글 I/O 페이지 로드 후 성능](https://events.google.com/io/session/61a0f83e-1d64-4bdc-b5d9-04360db925ec?lng=ko)

* [Javascript 초기로드 최적화](https://developers.google.com/web/fundamentals/performance/optimizing-content-efficiency/javascript-startup-optimization?hl=ko)

* [Webpack Tree Shaking](https://medium.com/@craigmiller160/how-to-fully-optimize-webpack-4-tree-shaking-405e1c76038)

* [Webpack Complete Guide 2020](https://www.valentinog.com/blog/webpack/)



* [commonJS & treeShaking](https://madewithlove.com/blog/software-engineering/optimizing-javascript-packages-for-tree-shaking/)

* [React 조건부 Lazy Loading](https://medium.com/codingtown/react-lazy-loading-suspense-fec84005b4b8)

* [LCP(Largest Contentful Paint) 최적화하기](https://ui.toast.com/weekly-pick/ko_202012101720)