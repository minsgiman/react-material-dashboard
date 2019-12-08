# Vue 컴포넌트 상속 (mixin과 extends)

Vue에서 컴포넌트를 상속하는 방법에는 mixin과 extends가 있다.
<br>

### mixin

* mixin은 컴포넌트 생성시 사용하는 옵션 객체를 미리 정의한 뒤, 이를 mixins 속성으로 전달한다. 이렇게 생성된 컴포넌트들은 동일한 옵션 객체를 갖는다.

* mixin은 다중상속이 가능하다. (array로 컴포넌트를 연결)

* mixin과 컴포넌트 자체에 중첩 옵션이 포함되어 있으면 적절한 전략을 사용하여 merge된다.

        var mixin = {
          data: function () {
            return {
              message: 'hello',
              foo: 'abc'
            }
          }
        }
        
        new Vue({
          mixins: [mixin],
          data: function () {
            return {
              message: 'goodbye',
              bar: 'def'
            }
          },
          created: function () {
            console.log(this.$data)
            // => { message: "goodbye", foo: "abc", bar: "def" }
          }
        })
  
* 동일한 LifeCycle hook 함수는 merge되어, 모든 함수가 호출된다. 또한 mixin hook은 컴포넌트 자체의 hook 이전에 호출된다. 
  
      var mixin = {
        created: function () {
          console.log('mixin hook called')
        }
      }
      
      new Vue({
        mixins: [mixin],
        created: function () {
          console.log('component hook called')
        }
      })
      
      // => "mixin hook called"
      // => "component hook called"
      
* 정의된 LifeCycle hook이 모두 호출되는 것과 달리 methods, components, directives는 오버라이딩 된다.<br>
  즉 확장된 컴포넌트에서 동일한 이름으로 함수를 재정의하면 재정의된 함수를 사용한다.<br>
  mixin하는 여러 컴포넌트에서 동일한 함수가 있는 경우, 배열 순서 상 나중에 등록된 컴포넌트의 함수를 호출한다.
  
        var mixin = {
          methods: {
            foo: function () {
              console.log('foo')
            },
            conflicting: function () {
              console.log('from mixin')
            }
          }
        }
        
        var vm = new Vue({
          mixins: [mixin],
          methods: {
            bar: function () {
              console.log('bar')
            },
            conflicting: function () {
              console.log('from self')
            }
          }
        })
        
        vm.foo() // => "foo"
        vm.bar() // => "bar"
        vm.conflicting() // => "from self"
<br>

### extends

* extends 옵션은 기존 객체를 확장하는 방식이다. 따라서 단일 상속만 가능하다.

* 상속시, 앞의 mixin과 동일한 옵션 merge 전략이 사용된다.

        // ParentComponent.vue
        <script>
        export default {
          created() {
            console.log('Created from the parent!');
          }
        }
        </script>
    
    
        // ChildComponent.vue
        <script>
        import ParentComponent from './ParentComponent.vue';
        
        export default {
          extends: ParentComponent,
        
          created() {
            console.log('Created from the child!');
          }
        }
        </script>
        
        //Created from the parent!
        //Created from the child!
<br>
  
***
 
### 참조
 
* Vue mixin<br>
  <https://kr.vuejs.org/v2/guide/mixins.html>
  
* 배민찬은 Vue를 어떻게 사용하나요?<br>
  <http://woowabros.github.io/experience/2018/06/07/vue-story-of-baminchan.html>

    