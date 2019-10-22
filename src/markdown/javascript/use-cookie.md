# Cookie 사용

##### 쿠키는 세션정보 유지에 많이 사용되며, 보안에 취약하기 때문에 브라우저 자체적으로 쿠키거부 설정을 할 수 있다.
 
***
 
### document.cookie를 통해서 쿠키를 읽기, 작성, 삭제한다.

 - 쿠키 반환
 
        document.cookie
        
 - 쿠키 생성 
 
        document.cookie="name=soke";
        
 - 만료시간이 있는 쿠키 생성
 
        document.cookie="name=soke; expires=Mon, 13 Jul 2015 05:04:24 GMT";
        
.

### setCookie Function 구현

    hx.util.setCookie = function (name, value, exdays) {
        var expires, d = new Date();
    
        d.setDate(d.getDate() + exdays);
        expires = "expires=" + d.toGMTString();
        document.cookie = name + "=" + value + ";" + expires;
    };
    
.
    
### getCookie Function 구현

    hx.util.getCookie = function (name) {
        var i, len, strName = name + "=";
        var cookieArr = document.cookie.split(';');
    
        len = cookieArr.length;
        for (i = 0; i < len; i+=1) {
            var strCookie = cookieArr[i];
            while (strCookie.charAt(0) === ' ') {
                strCookie = strCookie.substring(1);
            }
            if (strCookie.indexOf(strName) === 0) {
                return strCookie.substring(strName.length, strCookie.length);
            }
        }
        return "";
    };