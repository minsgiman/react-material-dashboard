# webpack 사용

***

### webpack을 사용하는 이유

 - 하나의 파일로 js를 쉽게 번들할 수 있다.
 - FE코드에 npm 패키지를 사용할 수 있다.
 - babel을 이용하여 ES6/ES7 코드를 작성할 수 있다. 쉽게
 - 코드를 압축 또는 최적화 할 수 있다.
 - HMR(Hot module Replacement)을 사용할 수 있다.
 - JS로 모든 유형의 파일을 포함할 수 있다. (require)
 - 그 밖의 수 많은 기능들?
 
.
 
### 왜 이런 기능이 필요?
 
 - js파일번들 - 자바스크립트를 모듈로 작성. 각각의 파일에 대해 <script>태그를 별도로 작성할 필요가 없다.
 - npm패키지 사용 - 오픈소스 코드의 커다란 생태계인 npm코드를 require하여 가져다 쓸 수 있다.
 - HMR사용 - 코드저장할때마다 리프레시 자동으로 된다.
 - JS로 모든 유형의 파일을 포함 - 추가적인 빌드도구의 수를 줄일 수 있고, 프로그램적으로 파일을 사용 및 수정할 수 있다.
 - ES6/ES7, LESS, SCSS - 쉽게 사용할 수 있다. (babel, scss 로더만 추가해주면)
 
.

### webpack.config.js에 설정

 - entry는 진입점 js파일을 지정해준다. main과 같은 존재. 이 안에서 require로 필요한 모듈을 포함한다.
 - output은 bundle파일 생성을 정의
 - HMR plugin을 사용하여 자동으로 리프레시되도록 해준다.
 - HtmlWebpackPlugin을 통하여 dist에 생성할 html의 내용이 되는 html 파일을 지정 (안의 bundle.js를 포함하는 스크립트 태그는 자동으로 들어갈 것이다.)
 - module.loaders 에 로더를 포함시켜줘야 원하는 파일유형을 js에서 require할 수 있다. (include는 해당 경로에 있는 파일에만 해당 로더를 적용)
 - devServer는 개발서버를 돌리는데 필요한 정의
 

        // webpack.config.dev.js
        var path = require('path')
        var webpack = require('webpack')
        var HtmlWebpackPlugin = require('html-webpack-plugin')
        
        module.exports = {
          devtool: 'cheap-eval-source-map',
          entry: ['./src/index'],
          output: {
            path: path.join(__dirname, 'dist'),
            filename: 'bundle.js'
          },
          plugins: [
            new webpack.HotModuleReplacementPlugin(),
            new HtmlWebpackPlugin({
              template: './src/index.html'
            })
          ],
          module: {
            loaders: [{
                test: /\.css$/,
                loaders: ['style-loader', 'css-loader']
              }, {
                test: /\.js$/,
                loaders: ['babel-loader'],
                include: path.join(__dirname, 'src')
              }]
          },
          devServer: {
            contentBase: './dist',
            hot: true
          }
        }
            
.

### 느낀점

 - 그동안 사용했던 gulp나 grunt에 비해 코드의 최적화, 번들을 훨씬 쉽게 할 수 있고,
 - ES6/ES7, LESS, SCSS를 사용하는데 있어서도, 간단히 로더만 설치하고 포함해주면 되어 사용하는데 더욱 편리함을 느꼈다.
 - commonJS를 지원하여 js를 모듈화하고, 여러 형태의 파일을 js에서 포함할 수 있는 것 또한 매력적이다.

.

***

### 참조

 - WebpackTutorial
 
  <https://github.com/AriaFallah/WebpackTutorial>


