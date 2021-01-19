const swap = Symbol('swap');

class MinHeap {
  constructor () {
    this.heap = [];
  }

  top () {
    return this.heap[0];
  }

  push (k) {
    this.heap.push(k);
    this.swim(this.heap.length - 1);
    return this.heap.length;
  }

  pop () {
    const r = this.top();
    this.heap[0] = this.heap[this.heap.length - 1];
    this.heap.pop();
    this.sink(0);
    return r;
  }

  swim (i) {
    let t = i;
    while (i > 0 && this.heap[t = ~~((i - 1) / 2)] > this.heap[i]) {
      this[swap](i, i = t);
    }
  }

  sink (i) {
    let t = i;
    while ((t = i * 2 + 1) < this.heap.length) {
      if (t < this.heap.length - 1 && this.heap[t] > this.heap[t + 1]) t++;

      if (this.heap[i] <= this.heap[t]) break;

      this[swap](i, i = t);
    }
  }

  [swap] (x, y) {
    this.heap[y] = this.heap[x] + this.heap[y];
    this.heap[x] = this.heap[y] - this.heap[x];
    this.heap[y] = this.heap[y] - this.heap[x];
  }
}

module.exports = MinHeap;
