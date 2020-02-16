# 버블정렬과 선택정렬 (bubble sort, selection sort)

버블정렬과 선택정렬은 구현이 간단하지만 비효율적이다. 둘 다 시간복잡도는 O(n^2)이다.
<br><br>

### 버블정렬 알고리즘

* 버블 정렬은 첫 번째 자료와 두 번째 자료를, 두 번째 자료와 세 번째 자료를, 세 번째와 네 번째를 ... <br>
이런 식으로 (마지막-1)번째 자료와 마지막 자료를 비교하여 교환하면서 자료를 정렬한다.

* 1회전을 수행하고 나면 가장 큰 자료가 맨 뒤로 이동하므로 2회전에서는 맨 끝에 있는 자료는 정렬에서 제외되고, <br>
2회전을 수행하고 나면 끝에서 두 번째 자료까지는 정렬에서 제외된다.<br>
이렇게 정렬을 1회전 수행할 때마다 정렬에서 제외되는 데이터가 하나씩 늘어난다.
 
```javascript
function bubbleSort(arr) {
	let result = [...arr]; // 원본 데이터 복사
  
    for (let i = 0; i < result.length - 1; i++) {
        for (let j = 0; j < result.length - i; j++) {
            if (result[j] > result[j + 1]) {
                let temp = result[j];
                result[j] = result[j+1];
                result[j+1] = temp;
            }
        }
    }
    
    return result;
}

let items = [8,4,9,2,5,10,15,22,88,63,18];
bubbleSort(items); // [2, 4, 5, 8, 9, 10, 15, 18, 22, 63, 88]
```
<br>

### 선택정렬 알고리즘

* 주어진 배열 중에서 최솟값을 찾는다.
* 그 값을 맨 앞에 위치한 값과 교체한다(패스(pass)).
* 맨 처음 위치를 뺀 나머지 리스트를 같은 방법으로 교체한다.
* 하나의 원소만 남을 때까지 위의 과정을 반복한다.

```javascript
function selectionSort(arr = []) {
// copy array
let result = [...arr];

for (let i = 0; i < result.length - 1; i++) {
  // 현재 인덱스를 최소값이라고 가정한다.
  let minimunNumberPos = i;

  // 오직 정렬되지 않은 배열에서만 탐색하기 위해서 j를 i + 1로 설정한다.
  for (let j = i + 1; j < result.length; j++) {
    if (result[minimunNumberPos] > result[j]) {
      minimunNumberPos = j;
    }
  }

  // swap
  if (minimunNumberPos !== i) {
    let temp = result[minimunNumberPos];
    result[minimunNumberPos] = result[i];
    result[i] = temp;
  }
}

return result;
}

console.log(selectionSort([2, 1, 4, 3, 5])); // [1,2,3,4,5]
```