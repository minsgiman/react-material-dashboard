# nginx config 설정 (1)
 
***

### 1. nginx 설정 파일 

 - 1) nginx.conf : 메인 설정 파일.
 
 - 2) fcgi.conf : FastCGI 환경설정 파일
 
 - 3) sites-enabled : 활성화된 사이트들의 설정 파일들이 위치. 아파치에서는 Virtual host의 설정에 해당한다. 기본적으로 존재하지 않을수도 있다.
 
 - 4) sites-available : 비활성화된 사이트들의 설정 파일들이 위치
 
.

### 2. Core 모듈 & 블록

 - 1) Core모듈 : nginx.conf 파일에서 worker_processes와 같은 지시자 설정 파일 최상단에 위치하면서 nginx의 기본적인 동작 방식을 정의한다.

      (옵션) - worker-processes : worker-processes는 워커 프로세스를 몇개 생성할 것인지를 지정하는 지시어다.


 - 2) http블록 : http 블록은 server, location의 루트 블록이라고 할 수 있고, 여기서 설정된 값을 하위 블록들은 상속한다. http 블록은 여러개를 사용할 수 있지만 관리상의 이슈로 한번만 사용하는 것을 권장한다.
      http, server, location 블록은 계층구조를 가지고 있다. 많은 지시어가 각각의 블록에서 동시에 사용할 수 있는데, http의 내용은 server의 기본값이 되고, server의 지시어는 location의 기본값이 된다. 그리고 하위의 블록에서 선언된 지시어는 상위의 선언을 무시하고 적용된다.
      
      (옵션) - client-max-body-size : 이 값은 업로드 할 수 있는 용량의 크기를 지정한다. 이 지시자의 기본값은 1MB인데, 더 많은 파일의 업로드를 허용하려면 이 값을 늘려줘야 한다.
 
 
 - 3) server블록 : server 블록은 하나의 웹사이트를 선언하는데 사용된다. 가상 호스팅(Virtual Host)의 개념이다. 예를들어 하나의 서버로 http://xxx.org 과 http://yyy.net 을 동시에 운영하고 싶은 경우 사용할 수 있는 방법이다.
 
      (옵션) - server-name : server-name 지시어에는 (주로 도메인인) 호스트 명이 온다. server_name이 속해있는 server 블록이 해당 호스트명에 대한 설정이라는 것을 의미한다.
 

 - 4) location블록 : location 블록은 server 블록 안에 등장하면서 특정 URL을 처리하는 방법을 정의한다.
 
      (옵션) - internal : internal은 특정 location이 nginx 내부 요청에서만 유효하고 외부 요청에서는 404로 응답하도록 한다.
      
 
 - 5) events블록 : 이벤트 블록은 주로 네트워크의 동작방법과 관련된 설정값을 가진다. 이벤트 블록의 지시어들은 이벤트 블록에서만 사용할 수 있고, http, server, location와는 상속관계를 갖지 않는다.



            events {
                /*
                    worker_connections은 events 안에서 사용하는 지시어로 몇개의 접속을 동시에 처리할 것인가를 지정하는 값이다.
                    이 값과 worker_process의 값의 조합을 계산해서 하나의 머신이 처리 할 수 있는 커넥션의 양을 산출할 수 있다.
                    예를들어 worker_process의 값이 4이고, worker_connections의 값이 1024라면 4 X 1024 = 4096개의 커넥션을 맺을 수 있다.
                    이 값을 설정하는 공식은 없고, 여러가지 자료를 참고하고, 직접 퍼포먼스를 테스트하면서 값을 조정해야 한다.
                */
                worker_connections  1024;            
            }

.

### 3. rewrite (재작성)

 - 1) URL 재작성 with regEx : location블록안에서 proxy-pass가 rewrite와 같이 사용될 경우, rewrite를 통해 URL을 재작성하여 proxy-pass로 보낸다.
 
    * If the rewrite rule is hit, the URI specified in the directive is ignored and the full changed request URI is passed to the server
    
    
            location  /app/ {
                rewrite    ^/app/hit/(.*)$ /hit_page.php?path=$1 break;
                proxy_pass   http://192.168.154.102:9999/some_dir/;
                /*
                    /app/hit/some/request/?name=xxxxx
                        => http://192.168.154.102:9999/hit_page.php?path=some/request/&name=xxxxx
                    /app/not_hit/some/request/?name=xxxxx 
                        => http://192.168.154.102:9999/some_dir/not_hit/some/request/?name=xxxxx
                */
            }
            
            location /other/ {
                    rewrite ^/other(/.*)$ $1 break;  # url에서 other 뒤에 있는 URL을 전부 그대로 사용.
                    proxy_pass http://backend;
                    ...
                    /*
                        /other/resource로 요청이 들어올 경우 http://backend/resource 로 요청을 보낸다.
                    */
            }


 - 2) 외부 리다이렉션 예제 : 아래코드에서 요청 host가 "dev-mskang-jp.test.com" 가 아니고, request uri가 "/health/health.html" 가 아니면 "https://mskang.test.com$request_uri?" 로 외부 리다이렉션을 시킨다. 
 
 
               if ($host = "dev-mskang-jp.test.com" ) {
                      set $bypass "yes";
               }
         
               if ($request_uri = "/health/health.html") {
                      set $bypass "yes";
               }
         
               if ($bypass != "yes") {
                      rewrite ^ https://mskang.test.com$request_uri? permanent;
                      //리다이렉션 할 URL에 http://가 포함되어 있으면 NGINX Rewrite 모듈은 자동으로 외부 리다이렉션을 사용한다.
               }
   
   외부 리다이렉션은 웹서버가 웹브라우저에게 302, 301 헤더 값을 전송하면 웹브라우저는 웹서버가 안내하는 페이지로 다시 재접속을 하는 방식이다.
   
   즉 웹서버 외부에 존재하는 웹브라우저가 리다이렉션의 주체가 된다.
 
 - 3) 내부 리다이렉션 예제. 내부 리다이렉션은 NGINX 내부에서 일어나는 리다이렉션이기 때문에 더 빠르고 웹브라우저에게 리다이렉션 자체를 숨길 수 있다.
 
 
            location /docs/ {
                rewrite ^/docs/(.*)$ /files/docs/$1;
            }

.
 
***

### 참조

 - nginx wiki
 
  <https://www.nginx.com/resources/wiki/start/>

 - nginx proxy_pass example

  <https://www.liaohuqiu.net/posts/nginx-proxy-pass/>

 - NGINX 환경설정
 
  <https://opentutorials.org/module/384/4526>
