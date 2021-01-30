const swap = Symbol('swap');

class PriorityQueue {
  constructor (comparator) {
    this.heap = [];
    this.comparator = comparator;
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

    while (
      t = Math.floor((i - 1) / 2),
      i > 0 && this.comparator(this.heap[i], this.heap[t]) < 0
    ) this[swap](i, i = t);
  }

  sink (i) {
    let t = i;

    while (t = i * 2 + 1, t < this.heap.length) {
      if (t < this.heap.length - 1 && this.comparator(this.heap[t], this.heap[t + 1]) > 0) t++;

      if (this.comparator(this.heap[i], this.heap[t]) <= 0) break;

      this[swap](i, i = t);
    }
  }

  [swap] (x, y) {
    const t = this.heap[x];
    this.heap[x] = this.heap[y];
    this.heap[y] = t;
  }
}

module.exports = PriorityQueue;
