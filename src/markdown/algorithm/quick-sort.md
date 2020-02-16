# 퀵 정렬 (quick sort)

퀵 정렬은 기준값(pivot)을 사용하여 정렬을 한다. 어떤 값을 기준값으로 선정하는지에 따라서 퀵정렬 성능이 달라진다.<br>
퀵 정렬은 O(nlogn)의 빠른 시간복잡도를 가진다.
<br><br>

### 알고리즘

* 하나의 리스트를 피벗(pivot)을 기준으로 두 개의 비균등한 크기로 분할하고 분할된 부분 리스트를 정렬한 다음,<br>
두 개의 정렬된 부분 리스트를 합하여 전체가 정렬된 리스트가 되게 하는 방법이다.

* 퀵 정렬은 다음의 단계들로 이루어진다.<br>
1) 분할(Divide): 입력 배열을 피벗을 기준으로 비균등하게 2개의 부분 배열(피벗을 중심으로 왼쪽: 피벗보다 작은 요소들, 오른쪽: 피벗보다 큰 요소들)로 분할한다.<br>
2) 정복(Conquer): 부분 배열을 정렬한다. 부분 배열의 크기가 충분히 작지 않으면 순환 호출 을 이용하여 다시 분할 정복 방법을 적용한다.<br>
3) 결합(Combine): 정렬된 부분 배열들을 하나의 배열에 합병한다.<br>
4) 순환 호출이 한번 진행될 때마다 최소한 하나의 원소(피벗)는 최종적으로 위치가 정해지므로, 이 알고리즘은 반드시 끝난다는 것을 보장할 수 있다.
<br><br>

![object](/images/develop/quick-sort.png "object")
<br><br>

```javascript
function quickSort(array) {
    if (array.length < 2) return array;

    const pivot = array[0];
    let leftCursor = 1;
    let rightCursor = array.length - 1;

    while (leftCursor <= rightCursor) {
        if (array[leftCursor] > pivot && array[rightCursor] < pivot) {
            [array[leftCursor], array[rightCursor]] = [array[rightCursor], array[leftCursor]];
            leftCursor++;
            rightCursor--;
        }

        if (array[leftCursor] <= pivot) {
            leftCursor++;
        }

        if (array[rightCursor] >= pivot) {
            rightCursor--;
        }
    }

    [array[0], array[leftCursor-1]] = [array[leftCursor-1], array[0]];
    const left = array.splice(0, leftCursor - 1);
    const mid = array.splice(0, 1);
    const right = array;

    return [
        ...quickSort(left),
        ...mid,
        ...quickSort(right)
    ];
}

const result = quickSort([5,3,8,4,9,1,6,2,7]); // [ 1, 2, 3, 4, 5, 6, 7, 8, 9 ]
```