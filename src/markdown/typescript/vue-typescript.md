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
  하지만 현재 위에서 본 Typescript 와의 조합시 문제를 가지고 있기 때문에, Decorator(@)를 활용한 Class 기반 컴포넌트가 현재의 대안이며 Typescript의 장점을 더 살릴 수 있다.

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
<br>

### Typescript 적용 시 해줘야 할 일들

* webpack.config.js 에서 ts-loader 설정을 한다.

        ...
        module.exports = (env) => {
            return {
                module: {
                    rules: [
                        ...
                        {
                            test: /\.vue$/,
                            loader: 'vue-loader',
                            options: {
                                loaders: {
                                    less: 'vue-style-loader!css-loader!less-loader'
                                }
                            }
                        },
                        {
                            test: /\.tsx?$/,
                            loader: 'ts-loader',
                            exclude: /node_modules/,
                            options: {
                                appendTsSuffixTo: [/\.vue$/]
                            }
                        }
                    ]
                },
                resolve: {
                    extensions: ['.ts', '.js', '.vue', '.json'],
                    alias: {
                        '@': resolve('src')
                    }
                },
                ...
            }
        }
        

* Typescript에서 .vue 파일을 import 할때 발생하는 에러 수정을 위해 vue-shims.d.ts 파일을 작성한다.<br>
  이는 Typescript에게 .vue 파일들이 Vue constructor와 같은 type이라고 선언한다. 

            // src/vue-shims.d.ts
            declare module '*.vue' {
                import Vue from 'vue';
                export default Vue;
            }

* vue-loader 버전에 따라, 위에서 vue-shims.d.ts 파일 작성후에도 Typescript가 *.vue 파일을 찾지 못하는 에러가 발생할 수 있다.<br>
  vue-loader를 "^14.2.2" 에서 "^15.2.4" 버전으로 올려서 해결하였다.<br>
  버전을 올리고 webpack.config.js에서 vue-loader plugin을 추가해주어야 한다.<br>
  
        // package.json
        "dependencies": {
            ...
            "ts-loader": "^6.2.1",
            "tslint": "^5.20.1",
            "typescript": "^3.1.3",
            ...
        },
        "devDependencies": {
            ...
            "vue-loader": "^15.2.4",
            ...
        }

        // webpack.config.js
        const VueLoaderPlugin = require('vue-loader/lib/plugin');
        ...
        
        module.exports = (env) => {
            return {
                ...
                plugins: [
                    new VueLoaderPlugin()
                ],
                ...
            }
        }        

* Webstorm에서 .vue 파일의 TSLint 지원은 2019.1 build 버전부터 제대로 동작한다.

        // tslint.json
        {
            "defaultSeverity": "error",
            "extends": [
                "tslint:recommended"
            ],
            "jsRules": {},
            "rules": {
                "quotemark": [true, "single", "avoid-escape"],
                "max-line-length": false,
                "object-literal-sort-keys": false,
                "semicolon": false,
                "trailing-comma": false,
                "ordered-imports": false,
                "no-console": false,
                "one-variable-per-declaration": false,
                "member-access": false,
                "member-ordering": false,
                "eofline": false,
                "object-literal-shorthand": false
            },
            "rulesDirectory": []
        }
        
* tsconfig.json 설정

        {
          "compilerOptions": {
            "outDir": "./built/",
            "sourceMap": true,
            "strict": true,
            "module": "es2015",
            "moduleResolution": "node",
            "target": "es5",
            "experimentalDecorators": true,
            "noImplicitThis": false,
            "resolveJsonModule": true,
            "allowSyntheticDefaultImports": true
          },
          "include": [
            "./src/**/*"
          ]
        }
<br>

***
 
### 참조

* vue-class-component<br>
  <https://github.com/vuejs/vue-class-component>
  
* Vue Typescript Support<br>
  <https://vuejs.org/v2/guide/typescript.html>

* Typescript Vue Starter<br>
  <https://github.com/Microsoft/TypeScript-Vue-Starter#single-file-components>

* vuex-class<br>
  <https://github.com/ktsn/vuex-class>
 
* Tslint support for Vue.js single file components<br>
  <https://youtrack.jetbrains.com/issue/WEB-31044>  
 
