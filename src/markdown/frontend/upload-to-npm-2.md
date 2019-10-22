# npm에 모듈 배포하기 2  (진입점 main 파일 구현)

***

 - 진입점이 되는 main 파일을 UMD 포맷과 ES6 module 포맷으로 구현하여, 모든 환경에서 해당 모듈을 사용할 수 있도록 지원한다.
 
.

### UMD main 파일 구현

 - UMD (Universal Module Definition) Pattern이란? : AMD (requireJS), CommonJS (node), 일반 browser 환경에서 통합해서 쓸 수 있는 javascript module pattern 이다.



         /*** api.common.js ***/
         
         (function (root, factory) {
           if (typeof define === 'function' && define.amd) {
             // AMD. Register as an anonymous module.
             define(['b'], factory);
           } else if (typeof module === 'object' && module.exports) {
             // Node. Does not work with strict CommonJS, but
             // only CommonJS-like environments that support module.exports,
             // like Node.
             module.exports = factory(require('b'));
           } else {
             // Browser globals (root is window)
             root.returnExports = factory(root.b);
           }
         }(this, function (b) {
           //use b in some fashion.
         
           // Just return a value to define the module export.
           // This example returns an object, but the module
           // can return a function as the exported value.
           return {};
         }));
     

.

### ES6 module main 파일 구현


        /**** api.esm.js ***/
        
        import account from './services/accountSrv';
        import camera from './services/cameraSrv';
        import clip from './services/clipSrv';
        import demo from './services/demoSrv';
        import notice from './services/noticeSrv';
        
        export { account, camera, clip, demo, notice }; 
    
.
   
### Webpack 설정 (webpack.config.js 작성)

 - entry에 위에서 작성한 bundle의 진입점이 되는 main파일을 지정한다. (포맷별 main파일)
 
 - output의 libraryTarget을 'umd'로 설정하고, path, filename을 지정한다.
 


        entry: {
            "api.common.min" : './../src/api.common.js',
            "api.esm.min" : './../src/api.esm.js'
        },
        ...
        output: {
            libraryTarget: 'umd',
            path: path.resolve(__dirname, './../dist'),
            filename: '[name].js'
        }

.

***
 
### 참조
 
  - How to write and build JS libraries in 2018
  
  <https://medium.com/@kelin2025/so-you-wanna-use-es6-modules-714f48b3a953>
  
  
  - Start your own JavaScript library using webpack and ES6
  
  <http://krasimirtsonev.com/blog/article/javascript-library-starter-using-webpack-es6>


