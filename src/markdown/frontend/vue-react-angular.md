# Vue-React-Angular 비교

***

### 렌더링 성능비교

 - 다음 페이지에서 성능 밴치마크 테스트 <http://www.stefankrause.net/js-frameworks-benchmark7/table.html>
 
 - 결과는 Vue, Angular 2+, React 크게 차이 없음.  Vue가 약간 우세하고, Angular 1은 느림.. 
 
 - React와 Vue 컴포넌트 Re-rendering 비교 
 
    1) React에서는 컴포넌트의 상태가 변경되면 해당 컴포넌트에서 루트로 시작하여 하위 자식 컴포넌트 트리를 전체 다시 렌더링한다. 
       불필요한 자식 컴포넌트의 Re-rendering을 피하려면 자식 컴포넌트 각각에서 "shouldComponentUpdate"를 구현해야 한다.
       
    2) Vue에서는 컴포넌트의 종속성이 렌더링 중 자동으로 추적되어 시스템에서 Re-rendering해야 하는 컴포넌트를 정확히 알고 있다. 
       따라서, React처럼 일일히 "shouldComponentUpdate" 를 구현해 주지 않아도 된다. 
       
    3) 결론은 Vue 프로젝트와 React 프로젝트가 최적화 되지 않았을때는, Vue 가 훨씬 더 빠르고, 만약에 최적화를 했다 하더라도 Vue가 React 보다 빠르다고 함. 
    
.   

### 개발속도 & 러닝커브

 - 개발속도 & 러닝커브는 Vue > React > Angular 2+  순.  특히 Angular 2+은 러닝커브가 높은편으로 기존 Angular 1과 완전히 다른 Framework이며, Typescript를 사용한다. 

 - Vue, React, Angular 코드비교 : <https://www.valuecoders.com/blog/technology-and-apps/vue-js-comparison-angular-react/#>
 
 -  Vue에서는 HTML, CSS, JS를 하나로 묶는 싱글파일 컴포넌트를 제공하여, 구현의 복잡도를 단순화하고, 빠른 프로토타이핑 및 개발속도를 가능하게 해준다. (점점 Vue로 옮겨가는 이유 중 하나)

.
 
### 컴포넌트 구현
         
 - **Vue** : template, js(data, event), style을 하나로 묶은 싱글파일 컴포넌트를 제공 (기존HTML 재사용 O, CSS 재사용 O) 
   <https://kr.vuejs.org/v2/guide/single-file-components.html>
   <http://vuejs.kr/jekyll/update/2017/03/13/vuejs-component-style-guide/>
   
 - **React** : JSX, data, event를 하나의 기능으로 묶어 컴포넌트를 제공. (기존 HTML 재사용 X,  CSS 재사용 O)
   <https://reactjs.org/docs/react-component.html>
   JSX를 사용함으로써, 기존의 HTML을 사용하지 못하는 것이 단점. 
   HTML태그와 스크립트가 섞여있는 것도 관심사의 분리 측면에서 좋아보이진 않는다.      
   
 - **Angular2+** : decorator (@Component)를 통하여, html, css, js 를 연결한 컴포넌트를 제공  (기존 HTML 재사용 O, CSS 재사용 O)
   <https://toddmotto.com/creating-your-first-angular-2-component>

.

### SPA 설계

 - **Vue** : Virtual DOM, 컴포넌트 구현 등의 코어 라이브러리만 제공하고, 추가로 Companion Library를 사용해야 한다. 
   
   라우터 (vue-router)
   <https://router.vuejs.org/kr/>
   상태관리 (vuex)
   <https://vuex.vuejs.org/kr/>
   
 - **React** : Virtual DOM, 컴포넌트 구현 등의 코어 라이브러리만 제공하고, 추가로 Companion Library를 사용해야 한다.
   
   라우터 (react-router)
   <https://www.npmjs.com/package/react-router>
   상태관리 (redux)
   <https://redux.js.org/>
   <http://webframeworks.kr/tutorials/react/flux/>
   
 - **Angular 2+** : 코어뿐 아니라, 전체 SPA설계 framework을 제공 
   <https://angular.io/docs>
 
 - Angular 사용시 코드가 strict하게되고, 구조적으로 강제성이 있어 큰 규모의 프로젝트에 적합할 수 있다.
   그러나, Vue나 React 또한 SPA설계를 위한 Companion Library 사용에 있어 충분히 넓은 생태계가 구축되어 있고,
   구조적 강제성이나 엄격한 언어가 무조건 장점만은 아닌 것 같다.

.

### 테스트

 - 기본적으로 vue, react, angular 모두 컴포넌트 기반의 framework이기 때문에 Unit Test 에 적합한 구조로 되어있다.

 - jasmin&karma, Jest, react-unit 등을 사용하여 TDD를 설계한다.

 - 테스팅에 있어서는 크게 차이없음

.

### 사용자수

 - 현재는 React > (Angular1 + Angular2+) > Vue 이지만, Vue 사용자가 매우 빠르게 증가하는 추세.
 
.

### 커뮤니티

 - **Vue**
    <http://vuejs.kr/>
    <https://forum.vuejs.org/>
    
 - **React**
    <https://reactjs.org/community/support.html>
    <https://discuss.reactjs.org/>
    
 - **Angular 2+**
    <https://plus.google.com/communities/115368820700870330756>
    <https://www.reddit.com/r/Angular2/>

.

***

### 참조
 
  <https://itnext.io/angular-5-vs-react-vs-vue-6b976a3f9172>
  <https://medium.com/js-dojo/react-or-vue-which-javascript-ui-library-should-you-be-using-543a383608d>
  <https://kr.vuejs.org/v2/guide/comparison.html>
  <https://medium.com/reverdev/why-we-moved-from-angular-2-to-vue-js-and-why-we-didnt-choose-react-ef807d9f4163>


