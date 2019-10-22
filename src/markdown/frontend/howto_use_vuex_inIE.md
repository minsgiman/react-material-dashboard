# IE에서 axios, vuex 사용시 에러 수정하기
 
***

.

#### 1. axios, vuex 사용시, 구형 IE 에러

 - 'Promise'가 정의되지 않았습니다. 에러가 발생한다. axios와 vuex는 IE를 지원하지 않는다.
 
. 
 
#### 2. es6-promise 설치를 통한 해결방법

 - 1) 설치 : **npm install es6-promise --save**
 
 - 2) entry로 사용하는 파일에 다음과 같이 넣어주면, 전역환경에 적용된다. : **import 'es6-promise/auto'**
 
 - 3) IE에서 더 이상 'Promise'가 정의되지 않았습니다. 에러가 발생하지 않는다.
 