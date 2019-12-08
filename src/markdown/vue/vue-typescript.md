# Vue에 Typescript 적용하기

Vue에 Typescript를 적용하는 방법 두가지<br>
&nbsp;&nbsp;&nbsp;&nbsp;- Vue.extend를 사용한 객체형태<br>
&nbsp;&nbsp;&nbsp;&nbsp;- Decorator(@)를 사용한 Class 기반 컴포넌트<br>
그리고 Typescript 적용시 겪는 이슈들에 대하여 정리하였다.
<br><br>

### Vue.extend 를 사용한 객체형태

* Typescript를 적용하여 Vue 컴포넌트 작성시 Vue.extend()를 선언해줘야 Typescript 코드가 Vue의 속성들과 함께 동작한다.<br>
  그리고 Webpack으로 빌드 할때 vue-loader가 Typescript를 컴파일하기 위해서 <script lang="ts"\> 로 선언해야 한다.
  
        <template>
          <div>
            {{ result }}
          </div>
        </template>
        
        <script lang="ts">
        import Vue from 'vue'
        
        export default Vue.extend({
          data() {
            return {
              result: '',
            }
          },
          methods: {
            sayHi(someone: string) {
              this.result = 'hello ' + someone;
            }
          },
          created() {
            this.sayHi('hi');
          },
        })
        </script>
        
* 하지만 이 방법은 Typescript에서 객체 형태로 컴포넌트를 정의할 때 props 의 타입으로 Typescript의 타입을 사용할 수 없다는 단점을 가지고 있다.<br>
  Typescript에서 아래 코드는 타입으로 사용되야 하는 Todo가 값으로 사용되고 있다고 에러를 출력한다.<br>
  즉 type: Todo[] 은 타입을 선언한 것이 아니고 type 에 Todo[] 라는 값을 할당한 것이다.

        interface Todo {
          title: string;
        }
    
        export default Vue.extend({
          props: {
            todos: {
              type: Todo[],
              required: true,
              default: []
            }
          },
          ...
<br>

### Decorator(@)를 사용한 Class 기반 컴포넌트

* Vue는 컴포넌트를 컴포넌트 생성 옵션 객체로 정의하는 방법을 기반으로 디자인되었기 때문에, Vue.extend와 객체를 이용하는 방법이 적합하다.<br>
  하지만 현재 위에서 본 Typescript 와의 조합시 문제를 가지고 있기 때문에, Decorator(@)를 활용한 Class 기반 컴포넌트가 현재의 대안이다.
  
        <template>...</template>
        <script lang="ts">
            import { Component, Prop, Vue } from 'vue-property-decorator';
            import { modal_dialog, checkbox } from './../../uikit';
            import { Check, Schedule } from './interface';
        
            @Component({
                components: {
                    modal_dialog,
                    checkbox
                }
            })
            export default class ScheduleDialog extends Vue {
                @Prop() title!: string;
                @Prop() pCheckList!: Check[];
                @Prop({default: 'normal'}) theme!: string;
        
                public checkList: Check[] = [];
        
                get schedule(): Schedule {
                    return this.$store.state.schedule;
                }
        
                private created() {
                    ...
                }
        
                private beforeDestroy() {
                    ...
                }
        
                public onAddName(name: string) {
                    this.$store.dispatch('addName', name);
                }
            }
        </script>
        <style lang="less">
            @import './../../uikit/common';
        
            .schedule_dialog {
            }
        </style>
  
  



