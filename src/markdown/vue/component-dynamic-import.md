# Vue.js의 Dynamic component 사용하기 

Vue에서 화면의 변경이 있을 때 Vue Router를 사용하는 방법뿐 아니라, Dynamic component를 활용하여 렌더링하는 컴포넌트를 변경할 수 있다.
<br><br>

### Component Switch

* Vue에서는 <component\></component\> 와 is attribute를 사용하여 컴포넌트를 switch할 수 있다.<br>
  is attribute에 선언한 component명을 binding 시켜준다.

        <template>
          <div>
            <component v-bind:is="currentTabComponent"></component> 
          </div>
        </template>
        
        <script>
        import Cat from './Cat'
        import Cupcake from './Cupcake'
        
        export default {
          components: {
            Cat,
            Cupcake
          },
          data : function() {
              return {
                  currentTabComponent: 'Cat'
              }
          }
        }
        </script>
<br>

### Component Dynamic Import

* components 에 아래와 같이 선언하여 해당 컴포넌트를 사용할때만 로드할 수 있다.<br>
  /\* webpackChunkName: "chunkFilename" \*/ 으로 bundle에서 분리한 chunk의 파일명을 지정한다.

    <template>
      <div>
        <component v-bind:is="currentTabComponent"></component> 
      </div>
    </template>
    
    <script>
    export default {
      components: {
        Cat: () => import(/* webpackChunkName: "cat" */ './Cat'),
        Cupcake: () => import(/* webpackChunkName: "cupcake" */ './Cupcake')
      },
      data : function() {
          return {
              currentTabComponent: 'Cat'
          }
      }
    }
    </script>
<br>
     
***
 
### 참조
 
* Vue Dynamic & Async Components<br>
  <https://vuejs.org/v2/guide/components-dynamic-async.html>

    