# MVW framework없이 Single Page App 만들기 3

***

## RequireJS를 사용한 AMD지원

 - RequireJS는 모듈화를 지원하여 private과 public으로 나뉜 캡슐화를 쉽게 구현. 
 - RequireJS는 첫 렌더링하고, 첫 인터랙션에 필요한 script만 로딩하고 이후에는 동직로딩을 할 수 있도록 지원.
 - RequireJS는 의존성관리를 지원하여 일일히 script로딩 순서를 신경쓰지 않아도 된다.
 
##### 1. 모듈별로 설정한 JS파일의 path들을 paths변수에 저장하고 등록한다.
 
    requirejs.config({
         baseUrl: 'js',
         paths: paths
    });
    
##### 2. 모듈 정의 상단에 의존성이 있는 모듈들을 선언해준다.
##### 크게 Page모듈, Service모듈, Component모듈로 나누었다.

    define(['service-network', 'cmp-form'], function(srvNetwork, cmpForm) {
    
##### 3. 모듈 정의가 아닌 단순히 코드를 실행할 때 의존성은 require 함수를 사용한다. 

    requirejs(['pageManager', 'service-gateway'],
        function(pageManager, srvGateway) {
            $(document).ready(function() {
                $(window).on('hashchange', routePage);