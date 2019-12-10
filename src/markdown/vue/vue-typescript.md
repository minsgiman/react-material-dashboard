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

* tsconfig.json, tslint.json, vue-shims.d.ts, webpack config, 

* Typescript vue import error. src/vue-shims.d.ts 로 해결?<br>
  <https://github.com/Microsoft/TypeScript-Vue-Starter#single-file-components>
  <br>
  <https://gongzza.github.io/javascript/vuejs/getting-started-vuejs-with-typescript-2/>
  
* vue-loader 버전 이슈<br>
  <https://withhamit.tistory.com/112>
  <br>
  <https://stackoverflow.com/questions/51024076/typescript-cannot-detect-vue-files>
  
* Webstorm *.vue file tslint not working issue<br>
  Please make sure you're using a 2019.1 build (https://www.jetbrains.com/webstorm/eap/) released after today as it contains a number of important fixes specifically for TSLint and VueJS<br>
  <https://youtrack.jetbrains.com/issue/WEB-31044>
  <br>
  Linting TypeScript in Vue.js components using TSLint<br>
  <https://www.jetbrains.com/help/webstorm/vue-js.html#ws_vue_linting>
  
  <br>
  tsconfig.json
  
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
   package.json
   
        "dependencies": {
            "@storybook/vue": "^5.2.6",
            "axios": "^0.18.0",
            "babel-cli": "^6.26.0",
            "babel-plugin-syntax-dynamic-import": "^6.18.0",
            "babel-preset-es2015": "^6.24.1",
            "babel-preset-vue": "^2.0.2",
            "babel-regenerator-runtime": "^6.5.0",
            "d3": "^3.4.13",
            "es6-promise": "^4.2.4",
            "fork-ts-checker-webpack-plugin": "^3.1.1",
            "ie-array-find-polyfill": "^1.1.0",
            "jasmine-core": "^3.3.0",
            "karma-chrome-launcher": "^2.2.0",
            "karma-htmlfile-reporter": "^0.3.7",
            "karma-jasmine": "^2.0.0",
            "lodash": "^4.17.11",
            "moment": "^2.24.0",
            "pikaday": "^1.8.0",
            "socket.io-client": "^2.2.0",
            "toastcam-apis": "^1.1.3",
            "ts-loader": "^6.2.1",
            "tslint": "^5.20.1",
            "tui-chart": "^2.13.0",
            "typescript": "^3.1.3",
            "uglifyjs-webpack-plugin": "^2.2.0",
            "vue-property-decorator": "^8.3.0"
          },
    <br>
    tslint.json
    
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
    <br>
    webpack.config.js
    
            var path = require('path');
            var CopyWebpackPlugin = require('copy-webpack-plugin');
            var VueLoaderPlugin = require('vue-loader/lib/plugin');
            
            function resolve (dir) {
                return path.join(__dirname, '..', dir)
            }
            
            module.exports = (env) => {
                return {
                    entry: {
                        "api.min" : env.category === 'b2b' ? './src/api.b2b.js' : './src/api.b2c.js',
                        "api.common.min" : './src/api.common.js',
                        "api.esm.min" : './src/api.esm.js'
                    },
                    output: {
                        libraryTarget: 'umd',
                        path: path.resolve(__dirname, './dist'),
                        filename: '[name].js'
                    },
                    module: {
                        rules: [
                            {
                                test: /\.less$/,
                                loader: 'style-loader!css-loader!less-loader'
                            },
                            {
                                test: /\.css$/,
                                use: [
                                    'vue-style-loader',
                                    'css-loader'
                                ]
                            },
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
                    plugins: [
                        new VueLoaderPlugin()
                    ],
                    context: __dirname
                }
            }
    <br>
    vue-shims.d.ts
            
            declare module '*.vue' {
                import Vue from 'vue';
                export default Vue;
            }