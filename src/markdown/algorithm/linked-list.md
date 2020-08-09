# Linked List in Javascript

```js
class LinkedListNode {
  constructor(value, next) {
    this.value = value;
    this.next = next || null;
  }
}

class LinkedList {
  constructor(value) {
    this.size = 0;
    this.head = null;
    this.tail = null;

    if (value) {
      if (Array.isArray(value)) return this.fromArray(value);
      return new TypeError(value + ' is not iterable');
    };

    return this;
  }

  prepend(value) {
    this.size += 1;

    const newNode = new LinkedListNode(value, this.head);

    this.head = newNode;
    if (!this.tail) this.tail = newNode;
    return this;
  }

  append(value) {
    this.size += 1;

    const newNode = new LinkedListNode(value);

    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;
      return this;
    }

    this.tail.next = newNode;
    this.tail = newNode;
    return this;
  }

  fromArray(values) {
    values.forEach(value => this.append(value));
    return this;
  }

  toArray(useNodes = false) {
    const nodes = [];
    let currentNode = this.head;
    while (currentNode) {
      nodes.push(useNodes ? currentNode : currentNode.value);
      currentNode = currentNode.next;
    };
    return nodes;
  }


  includes(value) {
    if (!this.head) return false;

    let isNode = value.constructor.name === 'LinkedListNode';
    if (isNode) value = value.value;

    let currentNode = this.head;

    while (currentNode) {
      if (value !== undefined && value === currentNode.value) {
        return true;
      };
      currentNode = currentNode.next;
    };

    return false;
  }

  find(callback) {
    if (Object.prototype.toString.call(callback) !== '[object Function]') {
      return new TypeError(callback + ' is not a function');
    };

    if (!this.head) return undefined;

    let currentNode = this.head;

    while (currentNode) {
      if (callback && callback(currentNode.value)) {
        return currentNode;
      };
      currentNode = currentNode.next;
    };

    return undefined;
  }

  delete(value, deleteOne = false) {
    if (!this.head) return false;

    let deletedNode = null;

    // If the head needs to be deleted 
    while (this.head && this.head.value === value) {
      this.size -= 1;
      deletedNode = this.head;
      this.head = this.head.next;
      if (deleteOne) return true;
    };

    let currentNode = this.head;

    // If any node except the head or tail needs to be deleted
    if (currentNode !== null) {
      while (currentNode.next) {
        if (currentNode.next.value === value) {
          this.size -= 1;
          deletedNode = currentNode.next;
          currentNode.next = currentNode.next.next;
          if (deleteOne) return true;
        } else {
          currentNode = currentNode.next;
        };
      };
    };

    // If the tail needs to be deleted
    if (this.tail.value === value) {
      this.tail = currentNode;
    };

    if (deletedNode === null) {
      return false;
    } else {
      return true;
    };
  }

  deleteHead() {
    if (!this.head) return null;

    this.size -= 1;

    const deletedHead = this.head;

    if (this.head.next) {
      this.head = this.head.next;
    } else {
      this.head = null;
      this.tail = null;
    }

    return deletedHead;
  }

  deleteTail() {
    if (this.size === 0) return false;

    if (this.size === 1) {
      if (this.head === null) {
        return false;
      } else {
        this.head = null;
        this.tail = null;
        this.size -= 1;
        return true;
      }
    }

    const deletedTail = this.tail;

    let currentNode = this.head;
    while (currentNode.next) {
      if (!currentNode.next.next) {
        this.size -= 1;
        currentNode.next = null;
      } else {
        currentNode = currentNode.next;
      }
    }

    this.tail = currentNode;

    return deletedTail;
  }

}

module.exports = LinkedList
```