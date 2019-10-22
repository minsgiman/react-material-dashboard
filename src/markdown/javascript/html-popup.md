# HTML Popup 띄우는 방법

***

### 1. HTML Popup 창 띄우기

    window.open("파일명", "팝업이름", "옵션설정");

.

### 2. 옵션 List

 - left : 좌측부터 팝업의 위치를 지정
 - top : 상단에서부터 팝업의 위치를 지정
 - width : 팝업창 너비 width 값 정하기
 - height : 팝업창 길이 height 값 정하기
 - status : 상태 표시바 보이거나 숨기기
 - toolbar : 툴바를 보이거나 숨기기
 - location : 주소표시줄 보이거나 숨기기
 - menubar : 메뉴바를 보이거나 숨기기
 - scrollbars : 스크롤바를 보이거나 숨기기
 - fullscreen : 풀스크린으로 화면 출력
 - channelmode : 채널모드로 화면 출력

.

### 3. 옵션 설정하기

 - 속성의 값은 yes, no 또는 0, 1을 사용하여 설정이 가능

        <script type="text/javascript">
           // 팝업을 띄우기, width 300, height 400, 스크롤바, 툴바, 메뉴바를 모두 숨기는 경우
           window.open('popup.html', 'popup01', 'width=300, height=400, scrollbars= 0, toolbar=0, menubar=no'); 
        </script>

