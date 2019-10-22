# viewport meta tag를 이용한 모바일 브라우저 레이아웃 설정

***

### 기본 viewport meta tag 설정 옵션 

  - height와 width는 viewport의 크기를 나타낸다. device크기로 설정할 수 있다. 
  
  - 디바이스 사이즈보다 viewport를 크게 설정하면, 보여줄 수 있는 영역보다 viewport가 크기 때문에, 스크롤이 생긴다.
  
  - initial-scale 속성은 페이지가 처음 로드될 때 줌 레벨을 조정한다. 
  
  - maximum-scale, minimum-scale, user-scalable은 사용자가 얼마나 페이지를 줌-인,아웃 할수 있는지 조정한다.

        
        <meta name="viewport"
          content="
              height = [pixel_value | "device-height"] ,
              width = [pixel_value | "device-width"] ,
              initial-scale = float_value ,
              minimum-scale = float_value ,
              maximum-scale = float_value ,
              user-scalable = ["yes" | "no"]"
        />

.

### width, height 옵션

   - width를 설정하지 않으면 대부분 모바일 브라우저는 980 pixel 기준으로 그린다. 모바일 브라우저에서 가장 많이 사용하는 렌더링 엔진이 Webkit 기반이기 때문인데, Webkit은 980 pixels을 사용한다.
        
   - width=device-width로 설정하는 경우 viewport의 width를 해당 디바이스의 width에 맞춘다. 
   
   - (width를 설정하지 않은 경우) -> 320 pixels의 디바이스, 320 pixels 강아지가 그려진 문서가 있을 때 980 pixels의 viewport를 320 pixels 디바이스에 맞춰 보여주기 위해서 그려진 강아지를 320 / 980 로 축소하여 작게 그려진다.
   
   - (width=device-width, initial-scale=1.0으로 설정하는 경우) -> 디바이스 사이즈가 320 pixels 이므로, Visible area와 Viewport size가 같게 되어 320 pixels 크기로 그려진 강아지가 화면에 꽉 차게 그려진다.
        
.

### 모든 viewport 옵션을 꼭 설정하지 않아도 된다.

   - 일부 값이 설정되면 대부분 브라우저는 다른 값을 추론한다.
   
   - scale 1.0으로 설정하면, 브라우저는 뷰포트 너비를 세로화면에서 device-width로 가정하고, 가로화면에서 device-height로 가정한다.

.

***
 
### 참조
 
  - 웹 페이지에서 다양한 화면을 지원하는 아주 간단한 방법
  
  <https://m.blog.naver.com/PostView.nhn?blogId=tmondev&logNo=220281872224&proxyReferer=https%3A%2F%2Fwww.google.com%2F>
  
  - viewport meta 태그를 이용해 모바일 브라우저상에서 레이아웃 조종하는 법
  
  <https://developer.mozilla.org/ko/docs/Mozilla/Mobile/Viewport_meta_tag>