# JS array modify by index

#### Array 특정 위치 삽입 : arr.splice(index, 0, item)

#### Array 특정 위치 삭제 : arr.splice(index, 1)
```javascript
const arr = [1,2,3,4,5,7]
const spArr = arr.splice(3, 1) // remove index 3 item

console.log(arr) // [1, 2, 3, 5, 7]
console.log(spArr) // [4]
```

#### 문자열 특정위치 자르기
```javascript
const Sample = "Hello World"
const result_substring = Sample.substring(0, 5); // string.substring(startIndex, endIndex)
const result_substr = Sample.substr(6,5); // String.substr(startIndex, 문자개수)

console.log(Sample); // "Hello World"
console.log(result_substring); // "Hello"
console.log(result_substr); // "World"
```
    