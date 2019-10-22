# IP 및 URL의 유효성 검사
 
***
 
### 정규표현식을 이용하여 입력받은 IP Address의 유효성을 체크하는 function이다. 

    hx.util.checkIpAddr = function(value) {
        var pattern = /^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$/;
        return pattern.test(value);
    };

### 정규표현식을 이용하여 입력받은 URL의 유효성을 체크하는 function이다.

    hx.util.checkUrl = function(value) {
        var pattern = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w_\.-]*)*\/?$/;
        return pattern.test(value);
    };