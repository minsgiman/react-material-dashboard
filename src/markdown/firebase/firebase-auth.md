# Firebase Authentication 사용하기

*** 

#### 먼저 firebase의 Authentication 탭의 로그인 방법 메뉴에서 이메일/비밀번호를 "사용 설정됨"으로 활성화 해준다.

![object](./../images/develop/fb-auth.png "object")

.

#### email과 password로 로그인한다.

 - firebase의 auth namespace를 사용
 - signInWithEmailAndPassword 를 통하여 인증시도
 - 리턴되는 promise를 통하여 결과를 처리할 수 있다.

        btnLogin.addEventListener('click', e => {
            var email = txtEmail.value;
            var pass = txtPassword.value;
            var auth = firebase.auth();
            
            var promise = auth.signInWithEmailAndPassword(email, pass);
            promise.catch(e => console.log(e.message));
        });

.

#### 사용자 계정 만들기

 - createUserWithEmailAndPassword 를 통하여 계정생성

        btnSignUp.addEventListener('click', e => {
            var email = txtEmail.value;
            var pass = txtPassword.value;
            var auth = firebase.auth();
            
            var promise = auth.createUserWithEmailAndPassword(email, pass);
            promise.catch(e => console.log(e.message));
        });
        
.
        
#### 인증상태 변경 감시

 - 앞의 promise로는 한번만 처리할 수 있는데 onAuthStateChanged 를 통해서 실시간으로 모든 auth 변경을 처리할 수 있다.
 - firebaseUser로 현재 로그인한 유저정보가 들어온다. 없다면 null이 된다.
 
        firebase.auth().onAuthStateChanged(firebaseUser => {
            if (firebaseUser) {
             //Login
             console.log(firebaseUser);
            } else {
             //Logout
             console.log('not logged in');
            }
        });

.
   
#### 로그아웃
    
 - signOut을 통하여 로그아웃한다.
   
        btnLogout.addEventListener('click', e => {
            firebase.auth().signOut();
        });

.

***         
         
### 참조

 - 웹에서 파이어베이스 인증 사용하기 - 파이어캐스트
 
   <https://www.youtube.com/watch?v=-OKrloDzGpU&index=4&list=PLl-K7zZEsYLmnJ_FpMOZgyg6XcIGBu2OX>

    