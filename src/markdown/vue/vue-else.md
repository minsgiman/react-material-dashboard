# vue와 다른 framework비교

***

### Polymer와 비교

 - vue의 컴포넌트는 polymer의 custom element와 유사한 개발 스타일을 제공한다.
 - polymer는 최신 Web Component Spec을 기반으로 하여, 이러한 기능을 지원하지 않는 브라우저에서는 성능이 약간 저하되는 폴리필을 요구한다.
 - 반면, vue는 브라우저 의존성이나 폴리필없이 script만 포함해주면 잘 동작한다.
 - polymer1.0에서 성능을 위하여 data-binding 시스템을 다소 제한적으로 만들었다. (vue는 다양한 표현식 제공)
 - polymer의 custom element는 html파일로 제작되어 일반 js, css 로 언어가 제한된다.
 - 반면, vue는 로더를 사용하면, ES2015+ 및 원하는 모든 CSS전처리기 쉽게 사용
 
. 

### React와 비교

 - 둘 다 가상 DOM을 활용, 반응적이고 조합 가능한 컴포넌트를 제공 
 
 - React컴포넌트는 JS내에서 작동하는 JSX를 사용하여 렌더링 함수내에서 UI를 표현
 - Vue도 렌더링 함수와 JSX를 지원하나, 기본적으로 HTML호환 템플릿을 제공한다.
 
         // React 컴포넌트 렌더링함수
         render () {
           let { items } = this.props
           let children
           if (items.length > 0) {
             children = (
               <ul>
                 {items.map(item =>
                   <li key={item.id}>{item.name}</li>
                 )}
               </ul>
             )
           } else {
             children = <p>No items found.</p>
           }
           return (
             <div className='list-container'>
               {children}
             </div>
           )
         }
         
         
         // Vue 컴포넌트 템플릿
         <template>
           <div class="list-container">
             <ul v-if="items.length">
               <li v-for="item in items" :key="item.id">
                 {{ item.name }}
               </li>
             </ul>
             <p v-else>No items found.</p>
           </div>
         </template>
 
    
 - vue는 단일 파일 컴포넌트 내에서 사용하는 CSS를 선언할 수 있다.
 - react는 별도의 css framework이나 모듈관리를 사용하여 관리할 수 있다
    
***

### 참조

 - 다른 프레임워크와의 비교
 
  <https://kr.vuejs.org/v2/guide/comparison.html>


