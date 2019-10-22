# nginx config 설정 (2)

***

### 1. upstream

 - Upstream 서버는 다른 말로 Origin 서버라고도 한다. 즉 여러대의 컴퓨터가 순차적으로 어떤 일을 처리 할 때 어떤 서비스를 받는 서버를 의미한다. NGINX는 Downstream 서버라고 할 수 있다.

 - 아래 예시와 같이 upstream 서버를 설정할 수 있다.
 
 
        location / {
            proxy_pass http://my_backend;
        }
    
        upstream my_backend {
            server 10.161.68.12:9091 max_fails=1; fail_timeout=60s;
            server 10.161.68.13:9091 max_fails=1; fail_timeout=60s;
            server 10.161.68.14:9091 max_fails=1; fail_timeout=60s;
        }


 - 설정옵션들
 
    1) weight=n : 업스트림 서버의 비중을 나타낸다. 이 값을 2로 설정하면 그렇지 않은 서버에 비해 두배 더 자주 선택된다.
    
    2) max_fails=n : n으로 지정한 횟수만큼 실패가 일어나면 서버가 죽은 것으로 간주한다.
    
    3) fail_timeout=n : max_fails가 지정된 상태에서 이 값이 설정만큼 서버가 응답하지 않으면 죽은 것으로 간주한다.
    
    4) ip_hash : 같은 방문자로부터 도착한 요청은 항상 같은 업스트림 서버가 처리 할 수 있게 한다.
    
    5) down : 해당 서버를 사용하지 않게 지정한다. ip_hash; 지시어가 설정된 상태에서만 유효하다.
    
    6) backup : 모든 서버가 동작하지 않을 때 backup으로 표시된 서버가 사용되고 그 전까지는 사용되지 않는다.
    
 - nginx가 제공하는 upstream서버의 로드밸런싱 메서드
 
    1) 라운드로빈(Round-robin)은 기본으로 사용하는 메서드로 모든 서버에 동등하게 요청을 분산한다.
        
        upstream test_proxy {
           server web-01;
           server web-02;
        }
        
    2) least_conn은 연결이 가장 작은 서버로 요청을 보낸다.       
       
        upstream test_proxy {
            least_conn;
            
            server web-01;
            server web-02;
        }

    3) ip_hash는 클라이언트 IP주소를 기준으로 요청을 분배한다. IP주소가 같다면, 동일한 서버로 요청을 전송한다.
        
        upstream test_proxy {
            ip_hash; 
        
            server web-01;
            server web-02;
        } 

.

### 2. error page 처리

 - 기본적으로 error_page를 통하여 에러 페이지를 설정할 수 있다.
 
 
        location /test {   //특정 디렉토리에 대한 404 에러 페이지 처리
            error_page 404 = /error_404.html;
        }
        
        ...
        error_page 500 502 503 504 = /error.html  //여러개의 코드에 대한 에러 페이지 동시 처리

 - nginx를 proxy서버로 사용할때 목적지서버의 404나 403 등의 에러응답코드를 다른것으로 변조하고 싶은경우가 있다.
   이럴경우 아래의 **proxy_intercept_errors on;** 코드를 삽입해서 proxy서버에서 직접 콘트롤 가능하게 할 수 있다.


        proxy_intercept_errors on;
        
        ...
        
        rewrite ^ /v1/AUTH_test/$cc/thumbnail/$cc.jpg break;
        proxy_pass http://my_backend;
        error_page 401 /updateToken;
        error_page 404 =200 /resources/images/img_make_err.png

.

### 3. Auth Request 모듈

 - auth request 모듈은 하위요청(subrequest)의 결과에 따라 클라이언트 인증을 구현하는 모듈이다. (1.5.4 버전부터 지원) 설치시 다음과 같이 활성화한다. **--with-http-auth-request-module**

 - auth-request 로 authentication 하위요청을 보내고, auth-request-set 으로 authorization server 에서 응답으로 보낸 값을 저장할 수 있다.
 
 
        location / {
            auth_request /auth;          //authentication 하위요청
            error_page 401 = @error401;  //인증실패 401에러 처리
        
            //$user 변수에 authorization server에서 X-Forwarded-User HTTP header 로 보낸 값을 set한다.
            auth_request_set $user $upstream_http_x_forwarded_user;
            proxy_set_header X-Forwarded-User $user;
            proxy_pass http://protected-resource:8080;
        }
    
        location /auth {
            internal;
            proxy_set_header Host $host;
            proxy_pass_request_body off;
            proxy_set_header Content-Length "";
            proxy_pass http://fakenetscaler:8888;
        }

.
 
***

### 참조

 - Capturing 5xx Errors with a Debug Server

  <https://www.nginx.com/blog/capturing-5xx-errors-debug-server/>

 - Using the NGINX Auth Request Module
 
  <https://redbyte.eu/en/blog/using-the-nginx-auth-request-module/>
