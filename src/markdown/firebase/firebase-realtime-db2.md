# Firebase Realtime Database 사용하기2

*** 

#### Child Data Add 이벤트 연결

 - child_added 이벤트는 child Data가 추가되었을 때 발생하고, snap은 추가된 아이템 Data 하나에 대한 객체이다.
 - snap.key는 DB Data의 Key이다.

        ...
        firebase.initializeApp(config);
        
        var dbRefObj = firebase.database().ref().child('object');
        var dbRefList = dbRefObj.child('hobbies');
         
        dbRefList.on('child_added', snap => {
            var li = document.createElement('li');
            li.innerText = snap.val();
            li.id = snap.key;
            ulList.appendChild(li);
        });

.

#### Child Data Changed 이벤트 연결

 - child_changed 이벤트는 child Data의 value가 변경되었을 때 발생하고, snap은 변경된 아이템 Data 하나에 대한 객체이다.
 - 앞에서 ID로 지정한 snap.key를 통해서 Dom Element를 찾는다.
    
        ...
        dbRefList.on('child_changed', snap => {
            var liChanged = document.getElementById(snap.key);
            liChanged.innerText = snap.val();
        });
    
. 

#### Child Data Removed 이벤트 연결

 - child_removed 이벤트는 child Data가 지워졌을 때 발생하고, snap은 제거된 아이템 Data 하나에 대한 객체이다.
     
        ...
        dbRefList.on('child_removed', snap => {
            var liRemoved = document.getElementById(snap.key);
            liRemoved.remove();
        });
    
.

***         
         
### 참조

 - Getting Started with the Firebase Realtime Database on the Web, Part 2 - Firecasts
 
   <https://www.youtube.com/watch?v=dBscwaqNPuk&index=3&list=PLl-K7zZEsYLmnJ_FpMOZgyg6XcIGBu2OX>