# 합병 정렬 (merge sort)

합병 정렬은 전체 원소를 하나의 단위로 분할한 후 분할한 원소를 다시 병합하는 정렬 방식이다.<br>
O(nlogn)의 빠른 시간복잡도를 가진다.
<br><br>

### 알고리즘

1. 리스트의 길이가 1이하이면 이미 정렬된 것으로 본다. 그렇지 않은 경우에는

2. 분할(divide): 정렬되지 않은 리스트를 절반으로 잘라 비슷한 크기의 두 부분 리스트로 나눈다.

3. 정복(conquer): 각 부분 리스트를 재귀적으로 합병정렬을 이용해 정렬한다.

4. 결합(combine): 두 부분 리스트를 다시 하나의 정렬된 리스트로 합병한다.<br> 
   결합 과정은 두 부분 리스트의 값들을 처음부터 하나씩 비교하여 작은 값을 차례대로 임시 리스트로 옮긴다.
   
5. 복사(copy): 임시 배열에 저장된 결과를 원래 배열에 복사한다.
<br><br>

```javascript
function mergeSort(arr) {
    if (arr.length === 1) {
        return arr;
    }

    const middle = Math.floor(arr.length / 2);
    const left = arr.slice(0, middle);
    const right = arr.slice(middle);

    return merge(mergeSort(left), mergeSort(right));
}

function merge(left, right) {
    let result = [];
    let leftIndex = 0;
    let rightIndex = 0;

    while (leftIndex < left.length && rightIndex < right.length) {
        if (left[leftIndex] < right[rightIndex]) {
            result.push(left[leftIndex]);
            leftIndex++;
        } else {
            result.push(right[rightIndex]);
            rightIndex++;
        }
    }

    return [...result, ...left.slice(leftIndex), ...right.slice(rightIndex)];
}

const list = [2, 5, 1, 3, 7, 2, 3, 8, 6, 3];
console.log(mergeSort(list)); // [ 1, 2, 2, 3, 3, 3, 5, 6, 7, 8 ]
```

