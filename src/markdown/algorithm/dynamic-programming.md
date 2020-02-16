# 동적 프로그래밍 (dynamic programming)

### 방법

* 모든 작은 문제들은 한번만 푼다. 따라서 정답을 구한 작은 문제를 어딘가에 메모해둔다.

* 다시 그보다 큰 문제를 풀어나갈 때 똑같은 작은 문제가 나타나면 앞서 메모한 작은 문제의 결과값을 이용한다.
<br><br>

### 조건

* 작은 문제가 반복이 일어나는 경우

* 같은 문제는 구할 때마다 정답이 같다.
<br><br>

### 예제 (피보나치 수)

* 아래 피보나치 함수는 한번의 함수호출로 두 번의 재귀적 함수 호출이 발생된다. 따라서 실행시간은 O(2^n)이 된다.

```javascript
function fibonacci(i) {
  if (i === 0) return 0;
  if (i === 1) return 1;
  return fibonacci(i - 1) + fibonacci(i -2);
}
```
<br>

* 동적 프로그래밍을 적용하여 fibonacci(i)의 결과를 캐시해두면 실행시간이 O(n)이 될 수 있다.

```javascript
const fibCache = [];
function fibonacci(i) {
  if (i === 0) return 0;
  if (i === 1) return 1;
  if (!fibCache[i]) {
    fibCache[i] = fibonacci(i - 1) + fibonacci(i - 2);
  }
  return fibCache[i];
}
```




