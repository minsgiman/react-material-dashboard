# npm에 모듈 배포하기 3  (npm publish)

***

 - .npmignore 작성과 local test방법 및 npm publish 커맨드에 관하여 정리하였다.

.

### .npmignore 작성

 - .npmignore 를 작성하여 배포에서 제외할 파일들을 정의한다.
 
 
        .idea/
        build/
        config/
        node_modules/
        src/
        static/
        test/
        index.html
        
.  
        
### local test 방법

 - 다른 폴더로 이동해서 npm install 명령어로 배포할 모듈의 루트경로를 지정해주면 현재 위치에 해당 모듈이 설치된다.
 
 
        mkdir ../install-test
        cd ../install-test
        npm install ../my-npm-module/

.

### npm publish

 - npmjs.com에서 계정을 만들고, 터미널에서 "npm login" 커맨드를 입력한다. 그 후 username과 password를 입력한다.
 
 - 로그인 후 "npm publish" 커맨드를 입력하면 npm에 배포될 것이다.
    
.


***
 
### 참조
 
  - Node.js 모듈을 npm 저장소에 배포하기
  
  <https://blog.outsider.ne.kr/829>
  
  - How to make a beautiful, tiny npm package and publish it
  
  <https://medium.freecodecamp.org/how-to-make-a-beautiful-tiny-npm-package-and-publish-it-2881d4307f78>