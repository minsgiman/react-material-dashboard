# npm에 모듈 배포하기 1  (package.json 작성하기)

***

 - package.json을 통하여 배포할 모듈에 대한 명세를 작성한다.
 
.

### 배포할 모듈에 대한 package.json 작성

 - 1) name & description : 모듈의 이름과 설명을 명시한다.
 - 2) version : Semantic Versioning에 맞는 방식으로 버전을 명시한다. (1.0.1)
 - 3) engines : 모듈이 호환되는 Node.js의 버전을 명시한다.
 - 5) scripts : 컴파일이나 설치 스크립트가 필요하면 여기에 입력한다.
 - 6) main : 모듈의 진입점이 되는 파일을 지정한다.
 - 7) module : Webpack2와 같이 ES6-aware tool을 사용하는 경우, import 할 파일을 지정한다.
 
 
        {
          "name": "xxx-apis",
          "version": "1.0.7",
          "description": "xxx API",
          "main": "dist/api.common.min.js",
          "module": "dist/api.esm.min.js",
          "author": "mskang",
          "repository": {
            "type": "git",
            "url": "git@github.xxx.git"
          },
          "scripts": {
            "dev": "node build/dev-server.js",
            "start": "node build/dev-server.js",
            "build": "node build/build.js",
            "unit": "cross-env BABEL_ENV=test karma start test/unit/karma.conf.js --single-run",
            "e2e": "node test/e2e/runner.js",
            "test": "npm run unit && npm run e2e"
          },
          "dependencies": {
            "axios": "^0.18.0",
            "babel-cli": "^6.26.0",
            ...
          },
          "devDependencies": {
            "autoprefixer": "^6.7.2",
            "avoriaz": "^1.13.1",
            "axios-mock-adapter": "^1.8.1",
            "babel-core": "^6.22.1",
            ...
          },
          "engines": {
            "node": ">= 4.0.0",
            "npm": ">= 3.0.0"
          }
        }
 
.

***
 
### 참조
 
  - Creating a package.json file
  
  <https://docs.npmjs.com/creating-a-package-json-file>


