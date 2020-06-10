# composite pattern

```javascript
class Node {
    display() {
        throw new Error('display() must be implement')
    }
}

class File extends Node {
    constructor(name) {
        super();
        this.name = name;
        this.depth = 0;
    }

    display() {
        let i, spaceStr = '';
        for (i = 0; i < this.depth; i+=1) {
            spaceStr += '  ';
        }
        console.log(spaceStr + this.name);
    }
}

class Directory extends Node {
    constructor(name) {
        super();
        this.name = name;
        this.depth = 0;
        this.nodes = [];
    }

    add(node) {
        node.depth = this.depth + 1;
        this.nodes.push(node);
    }

    display() {
        let i, spaceStr = '';
        for (i = 0; i < this.depth; i+=1) {
            spaceStr += '  ';
        }
        console.log(spaceStr + this.name);
        for (let i = 0, length = this.nodes.length; i < length; i+=1) {
            this.nodes[i].display();
        }
    }
}

const directory1 = new Directory('Directory 1');
const directory2 = new Directory('Directory 2');
const directory3 = new Directory('Directory 3');

const file1 = new File('File 1');
const file2 = new File('File 2');
const file3 = new File('File 3');

directory1.add(directory2);
directory1.add(directory3);
directory2.add(file1);
directory3.add(file2);
directory3.add(file3);

directory1.display();

/* console output
Directory 1
  Directory 2
    File 1
  Directory 3
    File 2
    File 3
*/
```