# ITCSS

ITCSS는 확장성과 유지보수성을 높여서 CSS를 작성하는 하나의 방법론이다.<br>
ITCSS(Inverted Triangle CSS)는 역삼각형 모양으로 CSS layer를 분리하였다.<br>
상위 Layer일수록 넓게 영향을 주고 하위 Layer로 갈수록 더욱 명확하고 세밀하게 선택자를 지정한다.

![object](/images/develop/itcss-key-metrics.svg "object")

<br>

ITCSS에서 Layer는 다음과 같이 분리한다.

![object](/images/develop/itcss-layers2.svg "object")

#### Settings
* font, color, config 등을 정의한다.

* 전처리기와 함께 사용한다. CSS만으로 작성하는 경우에는 skip한다.

```scss
/* styles/settings/_colors.scss */
$color-white: #fff !default;
$color-light: #f8f9fa !default;
$colors: (
  "default":   $color-text,
  "primary":   $color-primary,
  "secondary": $color-secondary,
  "white":     $color-white,
  "light":     $color-light,
  "dark":      $color-dark,
  "black":     $color-black,
  "success":   $color-success,
  "error":     $color-error
) !default;
$color-link-color: #007bff !default;
$color-link-color-hover: darken($color-link-color, 20%) !default;

/* styles/settings/_global.scss */
$use-aspect-ratio: true !default;
$use-background-size: true !default;
$use-clearfix: true !default;

/* styles/settings/_typography.scss */
$font-family-serif: Georgia, "Times New Roman", Times, serif !default;
$font-size-base: 1rem !default;
$font-size-xs: .75rem !default;
$font-weight-thin: 200 !default;
$font-weight-light: 300 !default;
```
<br>

#### Tools
* global로 사용되는 mixins와 functions를 정의한다. 

* Settings와 마찬가지로 전처리기와 함께 사용하며 Settings, Tools Layer에는 CSS가 작성되지 않고 Global 변수, 함수, 믹스인만 정의된다.

```scss
/* styles/tools/_overlay.scss */
@mixin overlay() {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
}

/* styles/tools/_rem.scss */
@function strip-units($value) {
  @return ($value / ($value * 0 + 1));
}
@function rem($pxval) {
  @if not unitless($pxval) {
    $pxval: strip-units($pxval);
  }
  $base: 16px;
  @if not unitless($base) {
    $base: strip-units($base);
  }
  @return ($pxval / $base) * 1rem;
}
```
<br>

#### Generic

* DOM 전체에 걸쳐서 적용될 CSS normalize, box-sizing 설정 코드등을 작성한다.

* 실제 CSS를 작성하는 첫 번째 Layer이다.

```scss
/* styles/generic/_box_sizing.scss */
html {
  box-sizing: border-box;
}

* {
  &,
  &:before,
  &:after {
    box-sizing: inherit;
  }
}

/* styles/generic/_normalize.scss */
html {
  line-height: 1.15; /* 1 */
  -webkit-text-size-adjust: 100%; /* 2 */
}

body {
  margin: 0;
}

[type="search"]::-webkit-search-decoration {
  -webkit-appearance: none;
}
```
<br>

#### Elements

* 순수 HTML elements에 대한 CSS를 작성한다. Element에 대한 browser default 설정을 redefine한다.

```scss
/* styles/elements/_links.scss */
a {
  color: $color-link-color;
  text-decoration: none;
  background-color: transparent; // Remove the gray background on active links in IE 10.
  -webkit-text-decoration-skip: objects; // Remove gaps in links underline in iOS 8+ and Safari 8+.
  &:hover {
    color: $color-link-color-hover;
    text-decoration: underline;
  }
}

/* styles/elements/_media.scss */
img {
  vertical-align: middle;
  max-width: 100%;
  height: auto;
}

object,
iframe,
embed,
canvas,
video,
audio {
  max-width: 100%;
}
```
<br>

#### Objects

* OOCSS 방법론에 따른다. UI에서 반복되는 패턴은 Objects에 정의할 후보가 될 수 있다.

* 예를 들면 list, button, input 등의 요소에 적용할 wrapper, grid, skin 등이 있다.

* class기반 선택자를 사용하는 첫번째 Layer이다.

```scss
/* styles/objects/_list-inline.scss */
.list-inline {
    list-style: none;
    padding-left: 0;
    &__item {
      display: inline-block;
      margin-bottom: 0;
    }
    &__item:not(:last-child) {
      margin-right: 1rem;
    }
}

/* styles/objects/_list-unstyled.scss */
.list-unstyled {
    list-style: none;
    padding-left: 0;
}
```
<br>

#### Components

* 특정 UI Component에 대한 CSS를 정의한다. (CSS의 많은 작업이 이곳에서 이루어진다.)

* Angular, Vue, React와 같은 컴포넌트 기반 framework에서 정의하는 각각의 컴포넌트 해당 style을 이곳에 정의한다.

```scss
/* styles/components/_collapse.scss */
.collapse {
  display: block;
  max-height: 0;
  overflow: hidden;
  transition: max-height .5s cubic-bezier(0, 1, 0, 1);

  &.show {
    max-height: 99em;
    transition: max-height .5s ease-in-out;
  }
}
```
<br>

#### Utilities

* override 할 수 있는 utilities, helper 클래스들을 정의한다.

* 예를 들면 .hidden, .opacity-75 등이 있고, 유일하게 !important를 사용하는 것이 허용된다.

```scss
/* styles/utilities/_visibility.scss */
.is-hidden {
  display: none !important;
}
.is-visible {
  display: block !important;
}

/* styles/utilities/_font-size.scss */
@if $use-font-size {
  .text-xs {
    font-size: $font-size-xs;
  }
  .text-sm {
    font-size: $font-size-sm;
  }
  .text-base {
    font-size: $font-size-base;
  }
  .text-lg {
    font-size: $font-size-lg;
  }
  .text-xl {
    font-size: $font-size-xl;
  }
  .text-xxl {
    font-size: $font-size-xxl;
  }
}
```
<br>

#### Results

* 정의한 Layer들을 모두 import한다.

```scss
/* styles/main.scss */
@import 'settings/**/*.scss';
@import 'tools/**/*.scss';
@import 'generic/**/*.scss';
@import 'elements/**/*.scss';
@import 'objects/**/*.scss';
@import 'components/**/*.scss';
@import 'utilities/**/*.scss';
```
<br>

ITCSS boilerplate<br>
[ITCSS](https://github.com/minsgiman/frontie-webpack)

***

### 참조
* A Primer to Well-Structured CSS<br>
<https://journal.highlandsolutions.com/a-primer-to-well-structured-css-96ce61b184f6/>

* ITCSS: Scalable and Maintainable CSS Architecture<br>
<https://www.xfive.co/blog/itcss-scalable-maintainable-css-architecture//>
