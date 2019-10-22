
### Polymer

Polymer는 모던 브라우저들에서 웹 컴포넌트의 사용을 가능하게 하는 polyfill 및 sugar 라이브러리이다. 
 
 - 커스텀 엘리먼트를 등록할 수 있는 구문을 제공
  
 - 양방향 데이터 바인딩 및 property observation
  
 - Life cycle callback 제공
 
 - Local DOM Template 제공



### Polymer CLI 

#### 1. polymer build

 - 1) minify HMLS, CSS, JS
 
 - 2) Generate Service worker to pre-cache dependencies

##### build시 polymer.json을 보고 build한다.

    {
        /* main entrypoint! 이 파일은 app shell을 import해야 한다.
        "entrypoint": "index.html",

        /* app의 common code를 포함하고 있는 app shell */
        "shell": "src/my-app.html",

        /* html파일 Array. shell에 의해 
        synchronously 로드되지 않고, async imports 된다. */
      "fragments": [
        "src/my-calendar.html",
        "src/my-develop.html",
        "src/my-develop-contents.html",
        "src/my-markdown.html",
        "src/my-photo.html",
        "src/my-photo-contents.html",
        "src/my-view404.html"
      ],

      /* build시 여기 포함되어 있어야 복사한다. */
      "sourceGlobs": [
       "src/**/*",
       "images/**/*",
       "bower.json"
      ],

      /* build시 include하고 싶은 추가적인 dependencies */
      "includeDependencies": [
        "manifest.json",
        "bower_components/webcomponentsjs/webcomponents-lite.min.js"
      ]
    }

##### build시 생성되는 bundled, unbundled중 bundled가 http request를 줄이기 위해서, 압축된 것


***

###service worker

 - 브라우저 캐시 시스템을 생성하고 관리하여 웹 페이지 리소스에 대한 오프라인 동작을 수행할 수 있게 해준다. 

 - build시에  sw-precache-config.js 를 읽어서 생성한다.
 
 - 자세한 내용은 아래에서
   
   <http://html5rocksko.blogspot.kr/2015/01/introduction-to-service-worker-how-to-use-serviceworker.html>

 



### polymer elements 종류

 - App Elements - The app elements enable building full web apps out of modular custom elements.

 - Iron Elements - A set of visual and non-visual utility elements. Includes elements for working with layout, user input, selection, and scaffolding apps

 - Paper Elements - Paper elements are a set of visual elements that implement Google's Material Design.


### polyfill

 - Web Component기술이 지원되지 않는 브라우저에서도 지원될 수 있게 도와주는 라이브러리

### vulcanize

 - 사용되는 웹 컴포넌트 파일을 병합해 HTTP request를 줄일 수 있도록 해주는 도구


***

### 참조

 - Polymer CLI
 
  <https://www.polymer-project.org/1.0/docs/tools/polymer-cli>

 - Introduction to Service Worker: How to use Service Worker

  <http://html5rocksko.blogspot.kr/2015/01/introduction-to-service-worker-how-to-use-serviceworker.html>