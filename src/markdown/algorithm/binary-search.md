# 이진 탐색 알고리즘

이진탐색은 정렬된 리스트에만 적용가능하다.<br>
시간복잡도는 O(logn) 이다.
<br><br>

### 알고리즘

1. 배열의 중간에 있는 임의의 값을 선택하여 찾고자 하는 값 X와 비교한다.
2. X가 중간의 값보다 작으면 중간 값 기준으로 좌측, 크면 중간 값 기준으로 우측을 다시 동일하게 탐색해 나간다.
3. 값을 찾을때까지 혹은 탐색할 대상의 길이가 1이 될때까지 진행한다.
<br><br>

```javascript
function binarySearch(arr, target) {
    function search (lo, hi) {
        const mid = parseInt((lo + hi) / 2);
        if (lo === hi) {
            return arr[lo] === target ? lo : -1;
        } else if (target > arr[mid]) {
            return search(mid + 1, hi);
        } else {
            return search(lo, mid);
        }
    }

    return search(0, arr.length - 1);
}

const arr = [1, 2, 3, 4, 5];
console.log(binarySearch(arr, 2)); // 1
```