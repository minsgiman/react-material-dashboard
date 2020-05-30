# decorator pattern

```javascript
class Espresso {
    constructor() {
        this.cost = 1000;
    }
}

function Water(espresso) {
    espresso.cost = espresso.cost + 500
    espresso.water = 250
    return espresso
}

function Milk(espresso) {
    espresso.cost = espresso.cost + 500
    espresso.milk = 100
    return espresso
}

function printObject(object) {
    let logs = ''
    for (const property in object) {
        logs += `${property}(${object[property]}) `
    }
    console.log(logs)
}

const espresso = new Espresso()
const americano = Water(new Espresso())
const cafeLatte = Milk(Water(new Espresso()))

printObject(espresso) // cost(1000)
printObject(americano) // cost(1500) water(250)
printObject(cafeLatte) // cost(2000) water(250) milk(100)
```