function dijkstra (n, edges) {
  const swap = Symbol('swap');
  class PriorityQueue {
    constructor (comparator) {
      this.heap = [];
      this.comparator = comparator;
    }

    push (k) {
      this.heap.push(k);
      this.swim(this.heap.length - 1);
      return this.heap.length;
    }

    pop () {
      const t = this.heap[0];
      this.heap[0] = this.heap[this.heap.length - 1];
      this.heap.pop();
      return t;
    }

    swim (i) {
      let t = 0;

      while (t = Math.floor((i - 1) / 2), i > 0 && this.comparator(this.heap[i], this.heap[t]) < 0) this[swap](i, i = t);
    }

    sink (i) {
      let t = 0;

      while (t = i * i + 1, t < this.heap.length) {
        if (t + 1 < this.heap.length && this.comparator(t, t + 1) > 0) t++;

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

  const graph = Array.from(
    { length: n },
    () => Int32Array.from({ length: n }).fill(-1)
  );
  const dist = Array.from({ length: n }, () => Infinity).fill(0, 0, 1);
  const pq = new PriorityQueue((a, b) => a[1] - b[1]);
  pq.push([0, 0]);

  for (let [x, y, w] of edges) graph[x][y] = w;

  while (pq.heap.length) {
    const [k] = pq.pop();

    for (let i = 0; i < graph[k].length; i++) {
      if (~graph[k][i] && dist[k] + graph[k][i] < dist[i]) {
        dist[i] = dist[k] + graph[k][i];
        pq.push([i, dist[i]]);
      }
    }
  }

  return dist[n - 1];
}

module.exports = dijkstra;
