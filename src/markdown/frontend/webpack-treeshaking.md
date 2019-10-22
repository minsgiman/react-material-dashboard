# Webpack Tree Shaking & Dynamic Import

***

### Tree Shaking

 - Webpack이 JS모듈을 번들링할 때 사용하지 않는 코드를 제거하는 최적화 과정
 - 아래 코드에서 abc.js의 b와 c 함수는 사용하지 않으므로 번들링 과정에서 제거된다. (**단, production 모드로 빌드하였을때만**)
 
 
        //abc.js        
        function a() { console.log("a"); }
        function b() { console.log("b"); }
        function c() { console.log("c"); }
        export {a, b, c}
        
                
        //main.js
        import * as abc from "./abc";
        abc.a();

.

  - 외부 라이브러리를 사용할 때 라이브러리에 Tree Shaking이 적용되기 위해서는 **외부 패키지의 package.json에 있는 sideEffects(Webpack 4.0부터 지원) 설정이 false로 되어있어야 한다.**
  - Webpack이 직접 코드를 평가하고 실행하는 대신에, sideEffects 설정을 보고 side effect 존재 여부를 판단하다. 이 옵션을 명시하지 않으면 Tree Shaking시에 side effect가 발생할 수 있다고 판단하여 해당 패키지를 Tree Shaking의 대상에서 제외한다.
  - 라이브러리에 sideEffects가 false로 되어있다고 무조건 Tree Shaking이 적용되는 것은 아니다. Webpack은 ES Module로 의존성을 관리하는 모듈만 Tree Shaking을 한다.
  - 아래 코드에서는 lodash-es 전체를 번들링에 포함하지 않고, 사용하는 snakeCase와 toUpper만 번들링에 포함된다. (lodash-es는 sideEffects 설정이 false로 되어있다.) 



        //main.js
        import { snakeCase, toUpper } from 'lodash-es';
        
        const snakeCaseStr = snakeCase('sddMMM');
        console.log(snakeCaseStr);
        const toUpperStr = toUpper(snakeCaseStr);
        console.log(toUpperStr);

.

### splitChunks

  - Webpack 4.0의 **splitChunks**옵션을 통해 번들파일을 분리할 수 있다.
  - 번들파일 분리를 통하여 브라우저 캐시를 전략적으로 활용하고, 초기 로딩속도를 최적화 할 수 있다.
  - cacheGroups : 명시적으로 특정 파일들을 청크로 분리할 때 사용한다.
  - test : 대상이 되는 파일들을 정규식으로 포함한다.
  - name : 청크로 분리할 때 사용될 파일명
  - chunks : 모듈의 종류에 따라 청크에 포함할지 말지를 결정하는 옵션. all은 test조건에 포함되는 모든 것을 분리. initial은 초기로딩에 필요한 경우. async는 import()를 이용해 다이나믹하게 사용되는 경우 분리.
  - 분리된 파일들은 HtmlWebpackPlugin을 통해 index.html에 주입된다.
  - 아래 코드에서 **lodash만 node_modules에서 따로 분리**하고 뒤에서 나올 Dynamic Import를 적용하면 처음부터 모든 Library를 로드하지 않고, 사용하는 시점에 lodash 번들을 로드할 수 있다.



        module.exports = {
            entry: {
                app: ['./scripts/main']
            },
            output: {
                filename: '[name].bundle.js',
                chunkFilename: '[name].js',
                path: path.resolve(__dirname, 'dist')
            },
            optimization: {
                splitChunks: {
                    cacheGroups: {
                        default: false,
                        lodash: {
                            test: /[\\/]node_modules[\\/]lodash[\\/]/,
                            name: 'lodash',
                            enforce: true,
                            chunks: 'all',
                            priority: 30
                        },
                        vendor: {
                            test: /[\\/]node_modules[\\/]/,
                            name: 'vendors',
                            chunks: 'all',
                            enforce: true,
                            priority: 10
                        },
                        commons: {
                            name: 'commons',
                            chunks: 'all',
                            minChunks: 2,
                            priority: 20,
                            enforce: true
                        }
                    }
                }
            }

.

### Dynamic Imports

 - dynamic import를 vue-router와 연동하여, 라우팅 기준으로 파일 번들링을 하고, 필요한 시점에 모듈을 동적으로 로드하도록 지원한다.
 - Babel이 dynamic import statement를 처리할 수 있도록 **syntax-dynamic-import** Plugin을 설치해주어야 한다.
 - dynamic import statement 안에 /\* webpackChunkName: "login" \*/ 를 넣어 청크 네임을 지정할 수 있다. 
 - webpack.config.js의 output.chunkFilename 을 통하여 non-entry 청크 파일들의 파일명을 설정한다.
 
 
 
        //.babelrc
        {
          "plugins": ["@babel/plugin-syntax-dynamic-import"]
        }
 
 
        //package.json
        "devDependencies": {
            "@babel/core": "^7.0.0",
            "@babel/plugin-syntax-dynamic-import": "^7.2.0",
 
 
        //main.js
        import VueRouter from 'vue-router';
        
        Vue.use(VueRouter);
        
        const router = new VueRouter({
            routes: [
                {path: '*', component: () => import(/* webpackChunkName: "login" */ './pages/login')},
                {path: '/guide', component: () => import(/* webpackChunkName: "guide" */ './pages/guide')}
            ]
        });
        
        
        //webpack.config.js
        module.exports = {
            entry: {
                app: ['./scripts/main']
            },
            output: {
                filename: '[name].bundle.js',
                chunkFilename: '[name].js',
                path: path.resolve(__dirname, 'dist')
            },

.

***
 
### 참조
  
  - webpack tree shaking
    <https://webpack.js.org/guides/tree-shaking/>

  - dynamic import
    <https://medium.com/js-dojo/build-a-lazy-load-router-with-vue-js-and-the-latest-browser-features-a1b52fe52dda>
    <https://webpack.js.org/guides/code-splitting/#dynamic-imports>

  - splitChunks
    <https://webpack.js.org/plugins/split-chunks-plugin/#select-chunks>
    
  - webpack url-loader
    <http://jeonghwan-kim.github.io/js/2017/05/22/webpack-file-loader.html>
      
  - vue-lazyload
    <https://github.com/hilongjw/vue-lazyload#readme>    