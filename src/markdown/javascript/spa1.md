# MVW framework없이 Single Page App 만들기 1

***

## Page 이동

 - Single Page App 내에서 존재하는 UI화면 단위를 Page로 구분하고, (정확히 하면 Event Procedure 단위.. 다음 장에서 설명) 
 - Page의 이동은 hash값 변경을 통하여 구현하였다.

##### 1. 아래 a태그 클릭시 href값이 #로 시작하고 있어, hash가 변경된다. 
 
        <li class="item-menu">
            <a href="#page-network-dhcp">DHCP</a>
        </li>
    
##### 2. hash가 변경되면, hashchange 이벤트가 발생한다.
 
        $(window).on('hashchange', routePage);
    
##### 3. hashchange 이벤트 콜백에서 framework에서 관리하고 있는 Page를 변경한다.
 
        function routePage() {
            var pageName = window.location.hash;
            ...
            ...
            pageManager.changeCenterPage(pageName, data, loadCb);
        }