# CAPTCHA 사용하기 

***

### CAPTCHA

 - CAPTCHA(Completely Automated Public Turing test to tell Computers and Humans Apart)는 어떠한 사용자가 실제 사람인지 컴퓨터 프로그램인지를 구별하기 위해 사용되는 방법이다.
 
. 
 
### 구글 reCAPTCHA
 
 - 나는 구글의 reCAPTCHA V2를 사용하였다. (무료 서비스)
 - 다음 reCAPTCHA 링크를 통해 사용 설정한다. <https://www.google.com/recaptcha/intro/invisible.html>
 - 1) Get reCAPTCHA에서 reCAPTCHA V2를 선택하고, API키가 사용제한 될 도메인을 설정하고, Register를 누른다.
 - 2) Site Key를 발급받으면 이것을 코드에 넣어서, reCAPTCHA를 사용한다.
 - 3) 다음 링크를 참고하여 구현한다. <https://developers.google.com/recaptcha/docs/display>  

.

### reCAPTCHA에서 체크 확인하기

 - 아래 코드와 같이 getResponse를 통해 구글 서버로부터 보안토큰을 받으면 체크가 성공된 것이다.

        var captchaId, token;
        
        ...
        
        if (grecaptcha) {
            token = grecaptcha.getResponse(captchaId);
            if (token) {
                //Check OK
            } else {
                //Check No
            }
        }