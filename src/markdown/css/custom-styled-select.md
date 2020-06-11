# Custom styled select

### HTML

```html
<div class="dropdown-container">
    <select>
        <option value="1">January</option>
        <option value="2">February</option>
        <option value="3">March</option>
        <option value="4">April</option>
        <option value="5">May</option>
        <option value="6">June</option>
        <option value="7">July</option>
        <option value="8">August</option>
        <option value="9">September</option>
        <option value="10">October</option>
        <option value="11">November</option>
        <option value="12">December</option>
    </select>
    <div class="select-icon">
        <svg focusable="false" viewBox="0 0 104 128" width="25" height="35" class="icon">
            <path d="m2e1 95a9 9 0 0 1 -9 9 9 9 0 0 1 -9 -9 9 9 0 0 1 9 -9 9 9 0 0 1 9 9zm0-3e1a9 9 0 0 1 -9 9 9 9 0 0 1 -9 -9 9 9 0 0 1 9 -9 9 9 0 0 1 9 9zm0-3e1a9 9 0 0 1 -9 9 9 9 0 0 1 -9 -9 9 9 0 0 1 9 -9 9 9 0 0 1 9 9zm14 55h68v1e1h-68zm0-3e1h68v1e1h-68zm0-3e1h68v1e1h-68z"></path>
        </svg>
    </div>
</div>
```
<br>

### CSS

```css
select {
    width: 100%;
    height: 50px;
    font-weight: bold;
    cursor: pointer;
    border-radius: 0;
    background-color: #c0392b;
    border: none;
    border-bottom: 2px solid #962d22;
    color: white;
    padding: 10px;
    appearance: none;
    -webkit-appearance: none;
    -moz-appearance: none;
    /* Adding transition effect */
    transition: color 0.3s ease, background-color 0.3s ease, border-bottom-color 0.3s ease;
}

/* For IE <= 11 */
select::-ms-expand {
    display: none;
}

select:hover,
select:focus {
    color: #c0392b;
    background-color: white;
    border-bottom-color: #DCDCDC;
}

.select-icon {
    position: absolute;
    top: 4px;
    right: 4px;
    width: 30px;
    height: 36px;
    pointer-events: none;
    border: 2px solid #962d22;
    padding-left: 5px;
    transition: background-color 0.3s ease, border-color 0.3s ease;
}
.select-icon svg.icon {
    transition: fill 0.3s ease;
    fill: white;
}

.dropdown-container {
    width: 250px;
    margin: 100px auto;
    position: relative;
}

select:hover ~ .select-icon,
select:focus ~ .select-icon {
    background-color: white;
    border-color: #DCDCDC;
}
select:hover ~ .select-icon svg.icon,
select:focus ~ .select-icon svg.icon {
    fill: #c0392b;
}
```

<br>

***

### 참조

* CSS-only Custom Styled Select<br>
  <https://levelup.gitconnected.com/css-only-custom-styled-select-99b1b022bfbf/>