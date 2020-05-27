# How to copy object in javascript

### Shallow Copy

A shallow copy refers to the fact that only one level is copied, and that will work fine for an array or object containing only primitive values.

#### 1) spread operator (...)
```javascript
const array = [3, 4, 5]

const copyWithEquals = array
console.log(copyWithEquals === array) // true

const copyWithSpread = [...array]
console.log(copyWithSpread === array) // false
console.log(...copyWithSpread) // 3, 4, 5
```

#### 2) array.slice()
```javascript
const array = [3, 4, 5]

const copyWithEquals = array
console.log(copyWithEquals === array) // true

const copyWithSlice = array.slice()
console.log(copyWithSlice === array) // false
console.log(...copyWithSlice) // 3, 4, 5
```

#### 3) Object.assign()
```javascript
const array = [3, 4, 5]

const copyWithEquals = array
const copyWithAssign = []
Object.assign(copyWithAssign, array)
console.log(...copyWithAssign) // 3, 4, 5
```
<br>

### Deep Copy

for objects and arrays containing other objects or arrays, copying these objects requires a deep copy

#### 1) lodash.cloneDeep(nestedArray)

#### 2) custom function
```javascript
const deepCopyFunction = (inObject) => {
  let outObject, value, key
  
  if (typeof inObject !== 'object' || inObject === null) {
    return inObject // Return the value if inObject is not an object
  }
  
  outObject = Array.isArray(inObject) ? [] : {}
  
  for (key in inObject) {
    value = inObject[key]
    outObject[key] = deepCopyFunction(value)
  }
  
  return outObject
}

let originalArray = [37, 3700, { hello: "world" }]
console.log("Original array:", ...originalArray) // 37 3700 Object { hello: "world" }

let deepCopiedArray = deepCopyFunction(originalArray)
console.log("Deep copy:", ...deepCopiedArray) // 37 3700 Object { hello: "world" }
```

#### 3) JSON.parse/stringify

If you do not use Dates, functions, undefined, Infinity, NaN, RegExps, Maps, Sets, <br>
Blobs, FileLists, ImageDatas, sparse Arrays, Typed Arrays or other complex types within your object, <br>
a very simple one liner to deep clone an object is: JSON.parse(JSON.stringify(object))