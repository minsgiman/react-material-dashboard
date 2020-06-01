# trottle & debounce

### Throttle

```javascript
class Throttling {
    constructor() {
        this.throttleCheck = null;
    }

    throttle(callback, milliseconds) {
        const that = this;

        return function() {
            if (!that.throttleCheck) {
                that.throttleCheck = setTimeout(() => {
                    callback(...arguments);
                    that.throttleCheck = null;
                }, milliseconds);
            }
        }
    }
}

let normalCount = 0,
    throttleCount = 0;

const normalFunc = (e) => {
    normalCount += 1;
    document.getElementById('normal').innerText = normalCount;
};

const throttleFunc = new Throttling().throttle((e) => {
    throttleCount += 1;
    document.getElementById('throttle').innerText = throttleCount;
}, 300);

window.addEventListener('scroll', (e) => {
    normalFunc(e);
    throttleFunc(e);
}, false);

// normal : 125
// throttle : 9
```

<br>

### Debounce

```javascript
class Debouncing {
    constructor() {
        this.debounceCheck = null;
    }

    debounce(callback, milliseconds) {
        const that = this;

        return function() {
            clearTimeout(that.debounceCheck);
            that.debounceCheck = setTimeout(() => {
                callback(...arguments);
            }, milliseconds);
        }
    }
}

const inputVal = document.querySelector('.input-text');
inputVal.onkeyup = new Debouncing().debounce(({ target }) => {
    getDataFromURL(target.value);
}, 500);

function getDataFromURL(input) {
    const contactURL = `http://sample/search/${input}`;

    fetch(contactURL)
        .then(res => {
            return res.json();
        })
        .then(response => {
            console.log(JSON.stringify(response));
        })
        .catch(error => {
            console.error('Error : ', error)
        });
}
```
