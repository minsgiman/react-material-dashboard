# Hash Table

### Hash Table 이해

해쉬테이블은 효율적인 탐색을 위한 자료구조로서, key를 value에 대응시킨다.

![object](/images/develop/hashtable1.svg "object")

위의 그림은 이름을 key로 전화번호를 저장하는 해쉬테이블이다.<br> 
value를 저장하는 배열의 크기가 16이라면, John Smith의 데이터를 저장할 때 index = hash_function("John Smith") % 16 를 통해서 index값을 구하고,<br>
buckets\[index\]에 John Smith의 전화번호 "521-1234"를 저장한다.

해쉬테이블은 key에 대한 데이터를 찾을 때, hash_function을 한번만 수행하면 array내에 저장된 index위치를 찾아낼 수 있기 때문에,<br>
데이터의 저장과 삭제가 매우 빠르다.
<br><br>

### Hash 충돌 처리  

그렇지만 해쉬테이블은 해쉬함수의 결과가 충돌이 발생할 수 있는 문제를 가지고 있다.<br>
hash_function(key) % array_length 값이 중복이 발생할 수 있는데, 이로 인하여 같은 위치에 데이터를 덮어쓰지 않기 위한 해결방법들이 있다.

그 중 ***Separate chaining*** 방식에 대하여 알아보고 구현해 보았다. 

![object](/images/develop/hashtable2.svg "object")

Linked List를 이용하는 방법인데, 각 index에 데이터를 저장하는 Linked List에 대한 포인터를 가진다.<br>
데이터를 추출할 때는 key에 대한 index를 구한 후, index가 가리키고 있는 Linked List에서 해당 key에 대한 데이터가 있는지 선형 검색한다.

동일 index에 대해서 데이터를 저장하는 자료구조는 Linked List 뿐 아니라, Tree를 이용하여 저장함으로써 검색 성능을 높일 수 있다.<br>
Java8 HashMap에서는 하나의 해쉬버킷에 8개 이상의 key-value 쌍이 모이면 Linked List를 Tree로 변경한다. 
<br><br>

### Javascript로 Hash Table 구현하기

Separate chaining 방법을 사용한 Hash Table 

```javascript
class HashTable {
    constructor(size) {
        this.buckets = new Array(size);
        this.size = size
    }
    hash(key) {
        return key.toString().length % this.size;
    }
    set(key, value) {
        let index = this.hash(key);
        if (!this.buckets[index]) {
            this.buckets[index] = [];
        }
        this.buckets[index].push([key, value]);
        return index;
    }
    get(key) {
        let index = this.hash(key);
        if (!this.buckets[index]) {
            return null;
        }
        for (let entry of this.buckets[index]) {
            if (entry[0] === key) { // key
                return entry[1]; // value
            }
        }
    }
}

const hashTable = new HashTable(10);

hashTable.set('userid1', 'example');
hashTable.set('userid20', 'say');
hashTable.set('userid30', 'other');
hashTable.set('userid4', 'sara');
hashTable.set('userid5', 'one');

console.log(hashTable.get('userid1')); // example
console.log(hashTable.get('userid20')); // say
console.log(hashTable.get('userid30')); // other
console.log(hashTable.get('userid4')); // sara
console.log(hashTable.get('userid5')); // one
```


