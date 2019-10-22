# Mutable, Immutable Array 함수와 Spread 구문

***

### Mutable Array 함수

 - push, pop, reverse, shift, unshift, sort, fill, splice


        const nums = [1, 2, 3];

        nums.push(4); // return: 4
        console.log(nums); // [1, 2, 3, 4];

        nums.pop(); // return: 4
        console.log(nums); // [1, 2, 3];

        nums.reverse(); // return: [3, 2, 1]
        console.log(nums); // [3, 2, 1];

        nums.shift(); // return: 3
        console.log(nums); // [2, 1];

        nums.unshift(3); // return: 3
        console.log(nums); // [3, 2, 1];

        nums.sort(); // return: [1, 2, 3];
        console.log(nums); // [1, 2, 3];

        nums.fill(1); // return: [1, 1, 1]
        console.log(nums); // [1, 1, 1];

        nums.splice(1, 2, 2); // return: [1, 1]
        console.log(nums); // [1, 2];

.

### Immutable Array 함수

  - concat, filter, map, slice (새로운 Array를 반환)


        const nums = [1, 2, 3];

        const concated = nums.concat(4);
        console.log(concated); // [1, 2, 3, 4];
        console.log(nums); // [1, 2, 3];

        const filtered = nums.filter(num => num >= 2);
        console.log(filtered);  // [2, 3];
        console.log(nums); // [1, 2, 3];

        const mapped = nums.map(num => num + 1);
        console.log(mapped); // [2, 3, 4];
        console.log(nums);  // [1, 2, 3];

        const sliced = nums.slice(0, 2);
        console.log(sliced);  // [1, 2];
        console.log(nums); // [1, 2, 3];


  - reduce, every, some, join (다른 형태의 데이터 반환)


        const nums = [1, 2, 3];

        const total = nums.reduce((sum, val) => sum + val));
        console.log(total); // 6;

        const isPositive = nums.every(num => num > 0);
        console.log(isPositive); // true

        const hasEven = nums.some(num => num % 2);
        console.log(hasEven); // true

        const csv = nums.join();
        console.log(csv); // "1,2,3";

.

### 펼침 (Spread) 구문

 - Array Literal


        // clone
        const nums = [1, 2, 3];
        const nums2 = [...nums];

        console.log(nums2); // [1, 2, 3];
        console.log(nums === nums2); // false

        // concat
        const nums1 = [1, 2];
        const nums2 = [5, 6];
        const nums3 = [...nums1, 3, 4, ...nums2];

        console.log(nums3); // [1, 2, 3, 4, 5, 6];


 - Object Literal


        // clone
        const person1 = {name: 'Kim', age: 20};
        const person2 = {...person1};

        console.log(person2); // {name: 'Kim', age: 20};
        console.log(person1 === person2); // false

        // merge
        const person = {name: 'Kim', age: 20};
        const player = {id: 123, score: 87};
        const merged = {...person, ...player, score: 80, level: 3}

        console.log(merged); // { name: "Kim", age: 20, id: 123, score: 80, level: 3 }





