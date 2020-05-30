# observer pattern

```javascript
class Model {
    constructor(value) {
        this._value = value;
        this._observers = [];
    }

    get value() {
        return this._value;
    }

    set value(value) {
        this._value = value;
        this.notifyAll();
    }

    registerObserver(observer) {
        this._observers.push(observer);
    }

    notifyAll() {
        this._observers.forEach((observer) => {
            observer.update(this._value);
        });
    }
}

class View {
    constructor(elementId, controller) {
        this.controller = controller;
        this.controller.model.registerObserver(this);
        this._element = null;
        this.initElement(elementId);
    }

    initElement(elementId) {
        this._element = document.getElementById(elementId);
        if (this._element) {
            this._element.innerText = this.controller.model.value;
            this._element.addEventListener('click', controller.handleEvent.bind(controller));
        }
    }

    update(value) {
        this._element.innerText = value;
    }
}

class Controller {
    constructor(model) {
        this.model = model;
    }

    handleEvent(e) {
        e.stopPropagation();
        switch(e.type) {
            case 'click':
                this.clickHandler(e.target);
                break;
            default:
                break;
        }
    }

    getModelValue() {
        return this.model.value;
    }

    clickHandler(target) {
        this.model.value += ' World';
    }
}

const model = new Model('Hellow');
const controller = new Controller(model);
const view = new View('header', controller);
```