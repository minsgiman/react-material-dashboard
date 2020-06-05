# Template Method Pattern

```javascript
class HouseTemplate {
  constructor() {
  }

  buildHouse() {
    this.buildFoundations();
    this.buildPillars();
    this.buildWalls();
    this.buildWindows();
  }

  buildFoundations() {
    console.log('Building Foundations')
  }

  buildWindows() {
    console.log('I am done with building windows')
  }

  buildWalls() {
    throw new Error('You have to build your own walls')
  }

  buildPillars() {
    throw new Error('You have to build your own pillars')
  }
}

class WoodenHouse extends HouseTemplate {
  constructor() {
    super();
  }

  buildWalls() {
    console.log('Building walls for wooden house')
  }

  buildPillars() {
    console.log('Building pillars for wooden house')
  }
}

const woodenHouse = new WoodenHouse();
woodenHouse.buildHouse();

// Building Foundations
// Building pillars for wooden house
// Building walls for wooden house
// I am done with building windows
```