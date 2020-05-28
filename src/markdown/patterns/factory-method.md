# factory method pattern

```javascript
class Latte {
    constructor() {
        if (this.constructor === Latte) {
            throw new Error("Object of Abstract Class cannot be created")
        }
    }
    getPrice() {
        throw new Error("Abstract Method has no implementation")
    }
}

class CafeLatte extends Latte {
    constructor() {
        super()
        this.price = 3000
    }
    getPrice() {
        return this.price
    }
}

class CaramelLatte extends Latte {
    constructor() {
        super()
        this.price = 5000
    }
    getPrice() {
        return this.price
    }
}

class LatteFactory {
    static create(latteType) {
        if (latteType === 'cafe') {
            return new CafeLatte()
        } else if (latteType === 'caramel') {
            return new CaramelLatte()
        }
    }
}

const latte = LatteFactory.create('cafe')
latte.getPrice()
```