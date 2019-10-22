# Garbage Collection

***

##### 브라우저는 가비지콜렉션을 수행하여 메모리 관리를 한다.

##### 가비지콜렉션이 수행될 때는 브라우저가 스크립트 읽는 것을 잠시 중단하므로 가비지콜렉션이 빈번하게 발생하면 성능에 영향을 준다.

##### 가비지콜렉션은 브라우저가 필요하다고 생각하면 수행한다.

##### 그러면 어떤 것이 가비지가 될까~

![object](./../images/develop/garbage1.png "object")

##### 아래 그림과 같이 최상위 객체로부터 접근할 수 있는 reference가 없는 value가 가비지가 된다.

![object](./../images/develop/garbage2.png "object")

##### 더 이상 사용하지 않는 value는 reference를 제거하여 가비지로 만들어 주어야 한다. 

    this._svcList = null;	 	 