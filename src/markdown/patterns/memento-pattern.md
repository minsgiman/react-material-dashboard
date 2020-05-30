# memento pattern

```javascript
class Shape {
    constructor(originState) {
        this._state = originState ? originState : '';
    }

    get state() {
        return this._state;
    }

    addState(state) {
        this._state += (', ' + state);
    }

    removeAllState() {
        this._state = '';
    }

    snapshot() {
        return this._state;
    }

    restore(snapshot) {
        this._state = snapshot;
    }
}

class History {
    constructor(shape) {
        this._undoStack = [];
        this._redoStack = [];
        this._shape = shape;
    }

    take() {
        const snapshot = this._shape.snapshot();
        this._undoStack.push(snapshot);
        this._redoStack = [];
    }

    undo() {
        if (this._undoStack.length > 0) {
            const dump = this._undoStack.pop();
            const snapshot = this._shape.snapshot();
            this._redoStack.push(snapshot);
            this._shape.restore(dump);
        }
    }

    redo() {
        if (this._redoStack.length > 0) {
            const dump = this._redoStack.pop();
            const snapshot = this._shape.snapshot();
            this._undoStack.push(snapshot);
            this._shape.restore(dump);
        }
    }
}

class ShapeController {
    constructor(shape, history) {
        this._shape = shape;
        this._history = history;
    }

    stateLogPrint() {
        console.log('shape state : ' + this._shape.state);
    }

    addState(state) {
        this._history.take();
        this._shape.addState(state);
        this.stateLogPrint();
    }

    removeAllState() {
        this._history.take();
        this._shape.removeAllState();
        this.stateLogPrint();
    }

    undo() {
        this._history.undo();
        this.stateLogPrint();
    }

    redo() {
        this._history.redo();
        this.stateLogPrint();
    }
}

const shape = new Shape('init');
const history = new History(shape);
const shapeController = new ShapeController(shape, history);

shapeController.addState('next1');  // shape state : init, next1
shapeController.addState('next2');  // shape state : init, next1, next2
shapeController.removeAllState();   // shape state :
shapeController.undo();             // shape state : init, next1, next2
shapeController.undo();             // shape state : init, next1
shapeController.redo();             // shape state : init, next1, next2
```