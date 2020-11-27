# 테마 변경 with LESS

#### App의 테마 설정에 따라 동적으로 테마를 변경하는 방법 (with less)

1. App 테마 Config에 따라 Body에 테마 class를 추가한다.

2. Body 테마 Class 별로 Less에서 테마 관련 변수들을 설정한다.

3. Less 테마 변수에 의존성이 있는 css들을 Mixin으로 작성한다.

4. Mixin으로 작성한 내용을 테마 변수를 설정한 Body + 테마 클래스 brace 안에서 실행한다. 

<br>

<Less 작성>
```less
/* common.less */
@import "header.less";

body.themeBlue {
  @headerColor: blue;
  .header();
}

body.themeRed {
  @headerColor: red;
  .header();
}

/* header.less */
.header() {
  .app-header {
    background: @headerColor;
  }
}
```

<br>

***

### 참조

* [A Complete Guide to Dark Mode on the Web](https://css-tricks.com/a-complete-guide-to-dark-mode-on-the-web)