# Virtual List

```javascript
class VirtuallList {
    constructor({viewportWidth, viewportHeight, itemHeight, items, itemRenderFn, totalRows}) {
        this.viewportWidth = viewportWidth;
        this.viewportHeight = viewportHeight;
        this.itemHeight = itemHeight;
        this.items = items;
        this.itemRenderFn = itemRenderFn;
        this.totalRows = totalRows || (items && items.length);

        this.screenItemsLen = Math.ceil(this.viewportHeight / this.itemHeight);
        this.cachedItemsLen = this.screenItemsLen * 3; // Cache 3 times the number of items that fit in the container viewport
        this.lastRepaintY = 0;
        this.maxBuffer = this.screenItemsLen * this.itemHeight;
        this.lastScrolledTime = 0;

        this.container = null;
        this.scrollHandler = null;
        this.rmNodeInterval = null;

        this.initList();
    }

    destroy() {
        clearInterval(this.rmNodeInterval);
        this.container.removeEventListener('scroll', this.scrollHandler);
        this.container.remove();
    }

    initList() {
        const fullSizeDummy = this.createFullSizeDummy(this.itemHeight * this.totalRows);
        this.container = this.createContainer(this.viewportWidth, this.viewportHeight);
        this.container.appendChild(fullSizeDummy);

        this._renderChunk(this.container, 0); //draw from 0

        this.buildRemoveNodeInterval();
        this.scrollHandler = this.onScroll.bind(this);
        this.container.addEventListener('scroll', this.scrollHandler);
    }

    buildRemoveNodeInterval() {
        // As soon as scrolling has stopped, this interval asynchronously removes all
        // the nodes that are not used anymore
        this.rmNodeInterval = setInterval(() => {
            if (Date.now() - this.lastScrolledTime > 100) {
                const badNodes = document.querySelectorAll('[data-rm="1"]');
                for (let i = 0, l = badNodes.length; i < l; i+=1) {
                    this.container.removeChild(badNodes[i]);
                }
            }
        }, 300);
    }

    onScroll(e) {
        const scrollTop = e.target.scrollTop; // Triggers reflow

        if (!this.lastRepaintY || Math.abs(scrollTop - this.lastRepaintY) > this.maxBuffer) {
            const first = parseInt(scrollTop / this.itemHeight) - this.screenItemsLen;
            this._renderChunk(this.container, first < 0 ? 0 : first);
            this.lastRepaintY = scrollTop;
        }

        this.lastScrolledTime = Date.now();
        e.preventDefault();
    }

    createRow(i) {
        let item;
        if (this.itemRenderFn) {
            item = this.itemRenderFn(this.items[i]);
        } else {
            if (typeof this.items[i] === 'string') {
                const itemText = document.createTextNode(this.items[i]);
                item = document.createElement('div');
                item.style.height = this.itemHeight + 'px';
                item.appendChild(itemText);
            } else {
                item = this.items[i];
            }
        }

        item.classList.add('vrow');
        item.style.position = 'absolute';
        item.style.top = (i * this.itemHeight) + 'px';
        return item;
    }

    /**
     * Renders a particular, consecutive chunk of the total rows in the list. To
     * keep acceleration while scrolling, we mark the nodes that are candidate for
     * deletion instead of deleting them right away, which would suddenly stop the
     * acceleration. We delete them once scrolling has finished.
     *
     * @param {Node} node Parent node where we want to append the children chunk.
     * @param {Number} from Starting position, i.e. first children index.
     * @return {void}
     */
    _renderChunk(node, from) {
        let finalItem = from + this.cachedItemsLen;
        if (finalItem > this.totalRows) {
            finalItem = this.totalRows;
        }

        // Append all the new rows in a document fragment that we will later append to
        // the parent node
        const fragment = document.createDocumentFragment();
        for (let i = from; i < finalItem; i+=1) {
            fragment.appendChild(this.createRow(i));
        }

        // Hide and mark obsolete nodes for deletion.
        for (let j = 1, l = node.childNodes.length; j < l; j+=1) {
            node.childNodes[j].style.display = 'none';
            node.childNodes[j].setAttribute('data-rm', '1');
        }

        node.appendChild(fragment);
    }

    createContainer(w, h) {
        const c = document.createElement('div');
        c.style.width = w ? w + 'px' : '100%';
        c.style.height = h ? h + 'px' : '100%';
        c.style.overflow = 'auto';
        c.style.position = 'relative';
        c.style.padding = 0;
        c.style.border = '1px solid black';
        return c;
    }

    createFullSizeDummy(h) {
        const el = document.createElement('div');
        el.style.opacity = 0;
        el.style.position = 'absolute';
        el.style.top = 0;
        el.style.left = 0;
        el.style.width = '1px';
        el.style.height = h + 'px';
        return el;
    }
}

const list = new VirtuallList({
    viewportWidth: 300,
    viewportHeight: 300,
    itemHeight: 90,
    items: [
        {name: 'kk', desc: 'okok1'},
        {name: 'ksadask', desc: 'okok2'},
        {name: 'zcxvcx', desc: 'okok3'},
        {name: '222', desc: 'okofk'},
        {name: 'cc', desc: '12okok'},
        {name: 'kkk', desc: 'ok31ok'},
        {name: 'kk33k', desc: 'ok2dsok'},
        {name: 'k123kk', desc: 'okodsfdsck'},
        {name: 'kkcck', desc: '1234okok'},
        {name: 'kkk', desc: '5555okok'},
        {name: 'kkk', desc: 'o78kok'},
        {name: 'kkd234k', desc: 'ok000ok'}
    ],
    itemRenderFn: function(item) {
        const el = document.createElement('div');
        const name = document.createElement('p');
        const desc = document.createElement('p');
        el.style.position = 'absolute';
        el.style.borderBottom = '1px solid black';
        el.style.width = '100%';
        el.style.height = '90px';
        name.innerHTML = item.name;
        name.style.color = 'blue';
        desc.innerHTML = item.desc;
        el.appendChild(name);
        el.appendChild(desc);
        return el;
    }
});
document.body.appendChild(list.container);
```

<br>

***

### 참조
 * Build your Own Virtual Scroll<br>
<https://dev.to/adamklein/build-your-own-virtual-scroll-part-i-11ib/>

 * Virtual list in vanilla JavaScript<br>
<https://sergimansilla.com/blog/virtual-scrolling/>