# 크로스 브라우저 테스트를 위한 Browsersync

***

### Browser Sync는 브라우저를 동기화해주는 프로그램이다.

 - Browser Sync는 npm모듈이므로 npm install browser-sync --save-dev 로 설치한다.
 - 자체적으로 다양한 옵션을 가진 미니 웹서버 기능을 지원하고, 파일 변경시에 이를 자동으로 감지해서 브라우저 Refresh 를 수행할 수 있다.
 - 여러 개의 브라우저를 실행했을 때 한 브라우저에서 클릭을 하면 다른 브라우저에서도 동일한 위치에 클릭 이벤트를 발생시켜 여러 브라우저에서 동시에 동일하게 동작할 수 있도록 도와주는 기능이 있다.

### Gulp와 연동

 - 아래에서 browserSync 관리자 Page는 3000포트로 접속한다.
 - 아래에서 UI는 3001포트로 접속한다.
 - 파일 변경을 감시하여 browserSync의 reload 기능을 사용하도록 하였다.
 
        gulp.task('serve', function() {
            browserSync({
                browser : "default",
                https : false,
                notify : false,
                port : 3000,
                server : {
                    baseDir : './'
                },
                ui : {
                    port : 3001
                }
            });
            gulp.watch(['js/*.js', 'js/*/*.js', 'js/*/*/*.js'], browserSync.reload);
            gulp.watch(['css/*.css'], browserSync.reload);
            gulp.watch(['./*.html'], browserSync.reload);
        });