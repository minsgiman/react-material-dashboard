# CSS Tricks

### 1. Text Select Color

* Text select/highlight color를 설정한다.

![object](/images/develop/text_select_color.png "object")

<br>

CSS
```css
::selection {
    background-color: #013896;
    color: #f1f1f1;
}
```
<br>

### 2. Drop Caps

* 첫 번째 글자를 크게 만드는 Drop cap 효과를 준다. (article/newspaper look)

![object](/images/develop/drop_caps.png "object")

<br>

HTML, CSS
```html
<span class="dropcap">L</span>orem ipsum dolor sit amet,
```
```css
.dropcap {
    float: left;
    font-size: 400%;
    color: #cf142b;
    margin: -9px 7px -20px 0;
}
```
<br>

### 3. Image Overlay

* 이미지에 마우스 오버시, visual 효과를 입힌다.

![object](/images/develop/image_overlay.gif "object")

<br>

HTML, CSS
```html
<div class="container">
    <a href="https://luxurylondon.co.uk/travel/international/cambodia-luxury-hotels-review/">
        <img src="https://luxurylondon.co.uk/images/frontend/logos/luxury-london-logo.png" alt="Avatar" class="image">
        <div class="overlay">
            <div class="text">Go to site.</div>
        </div>
    </a>
</div>
```
```css
.overlay {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    height: 100%;
    opacity: 0;
    transition: 0.5s ease;
    background-color: #cf142b;
}
.overlay .text {
    color: #f1f1f1;
    text-align: center;
    margin-top: 34px;
    font-size: 12px;
}

.container {
    position: relative;
    width: 128px;
    height: 128px;
}
.container a {
    display: block;
    width: 100%;
    height: 100%;
}
.container:hover .overlay {
    opacity: 0.8;
    cursor: pointer;
}
```
<br>

### 4. Colorize and Zoom Into Image on Hover

* Image hover시 Zoom 효과, 색효과 등을 준다. 

* <https://w3bits.com/css-image-hover-zoom/>

CSS
```css
.image {
    width: 100%;
    overflow: hidden;
}
.image-colorize img {
    transition: transform .5s, filter 0.5s ease-in-out;
    filter: grayscale(100%);
}
.image-colorize:hover img {
    filter: grayscale(0);
    transform: scale(1.1);
}
```