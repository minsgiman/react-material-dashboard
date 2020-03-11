# CSS Browser hack

### CSS Browser hack 사용

```css
/* Firefox */
@-moz-document url-prefix() {
      body, html { margin:0; padding:0 }
}
 
/* Chrome, Safari */
@media screen and (-webkit-min-device-pixel-ratio:0) {
      body, html { margin:0; padding:0 }
}

/* IE10+ */
@media all and (-ms-high-contrast: none), (-ms-high-contrast: active) {
    body, html { margin:0; padding:0 }
}
```