# 반응형 웹에서 CSS 중앙정렬 기법

*** 

#### Tag 구조는 아래와 같다.

    <div class="msgbox">
        <div class="outerWrap">
            <div class="contentWrap">
                ...
                ...
            </div>
        </div>
    </div>

### 테이블 패턴을 이용한 수직 중앙정렬. text-align을 통한 가로 중앙정렬.

 - 테이블 패턴을 사용하려면 일반 블록 레벨 요소가 필요하고, 그것들이 테이블 셀처럼 동작하게 만들면 수직 중앙정렬이 가능해진다. (태그를 하나 더 사용해야 한다.)
 - text-align: center 와 display: inline-block 을 사용하여 가로 중앙정렬을 한다.
 - 수직 & 가로 중앙정렬 대상은 contentWrap 요소이다.


         .msgbox {
               display: table;
               width: 100%;
               height: 100%;
               ...
         }
         
         .msgbox .outerWrap {
               display: table-cell;
               text-align: center;
               vertical-align: middle;
               width: 100%;
               height: 100%;
         }
         
         .msgbox .outerWrap .contentWrap {
               display: inline-block;
               width : 30%;
               height: 30%;
               background: #00a4ec;
         }
         
***         
         
### 참조

 - Center DIV with Dynamic Height
 
   <https://css-tricks.com/snippets/css/center-div-with-dynamic-height/>

 - 최고의 CSS 중앙정렬 기법
 
   <https://webdesign.tutsplus.com/ko/tutorials/the-holy-grail-of-css-centering--cms-22114>