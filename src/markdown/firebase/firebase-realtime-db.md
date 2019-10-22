# Firebase Realtime Database 사용하기

*** 

#### Firebase Realtime DB를 사용하기 위해 Firebase에 만들어 놓은 Web프로젝트를 선택하고, 웹앱에 Firebase추가 버튼을 누른다.

![object](./../images/develop/fb-base.png "object")

.

#### 버튼을 누르면 코드 스니펫이 나오는데 이것을 복사하여 Web App 코드에 붙여넣는다.

 - 코드안에 Firebase 서비스 이용에 필요한 정보들도 들어있다.

        <script src="https://www.gstatic.com/firebasejs/3.6.0/firebase.js"></script>
        <script>
          // Initialize Firebase
          var config = {
            apiKey: "xxxxxx",
            authDomain: "mskang-64543.firebaseapp.com",
            databaseURL: "https://mskang-64543.firebaseio.com",
            storageBucket: "xxxxxxx",
            messagingSenderId: "xxxxxxx"
          };
          firebase.initializeApp(config);
        </script>

.

#### 이제 Firebase의 Database탭을 선택하고, 규칙을 모두 true로 바꿔준다.

![object](./../images/develop/fb-db-rule.png "object")

.

#### Data를 입력한다.

![object](./../images/develop/fb-db-data.png "object")

.

#### 마지막으로 아래와 같이 Web App에 코드를 넣으면 Database의 text값이 변경될 때마다 alert가 발생하고, 변경된 값을 보여준다. (Realtime Database 동기화 코드)
  
 - ref()는 Realtime Database의 root를 리턴해준다.
 - child로 Key를 지정하여 root아래 child Data객체를 얻어온다.
 - Data객체의 on을 통해서 DB와 Web을 동기화 할 수 있다. (DB에서 해당 Data객체의 변경이 발생하면, 이벤트가 발생)
 - on의 첫번째 파라미터는 이벤트 Type, 두번째 파라미터는 콜백 function
 - snap 파라미터는 data snapshot (Key, value, child 등등의 정보를 가지고 있음)
 
        ...
        firebase.initializeApp(config);
        
        var dbRef = firebase.database().ref().child('text');
        dbRef.on('value', snap => {
            alert(snap.val())
        });
    
. 
         
***         
         
### 참조

 - Getting Started with Firebase on the Web
 
   <https://www.youtube.com/watch?v=k1D0_wFlXgo&list=PLl-K7zZEsYLmnJ_FpMOZgyg6XcIGBu2OX>
   
 - Getting Started with the Firebase Realtime Database on the Web, Part 1 - Firecasts 
  
   <https://www.youtube.com/watch?v=noB98K6A0TY&list=PLl-K7zZEsYLmnJ_FpMOZgyg6XcIGBu2OX&index=2>