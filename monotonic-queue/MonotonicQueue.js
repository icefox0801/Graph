module.exports = class MonotonicQueue {
  constructor (comparator) {
    this.queue = [];
    this.comparator = comparator;
  }

  push (v) {
    let top;

    while (this.queue.length && (top = this.queue[this.queue.length - 1], this.comparator(v, top)) < 0) this.queue.pop();

    this.queue.push(v);
  }

  shift () {
    this.queue.shift();
  }

  first () {
    return this.queue[0];
  }
}
