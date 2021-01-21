function mst (n, edges) {
  if (!edges.length) return 0;

  class DisjointSet {
    constructor (n) {
      this.parent = Array.from({ length: n }, (v, k) => k);
      this.rank = Array(n).fill(0);
    }

    find (x) {
      return this.parent[x] === x ? this.parent[x] : (this.parent[x] = this.find(this.parent[x]));
    }

    merge (x, y) {
      const rx = this.parent[x];
      const ry = this.parent[y];

      if (rx === ry) return;

      if (this.rank[rx] < this.rank[ry]) {
        this.parent[rx] = ry;
      } else if (this.rank[rx] > this.rank[ry]) {
        this.parent[ry] = rx;
      } else {
        this.parent[rx] = ry;
        this.rank[ry]++;
      }
    }
  }

  edges.sort((a, b) => a[2] - b[2]);

  const djSet = new DisjointSet(n);
  let sum = 0;

  for (let edge of edges) {
    if (djSet.find(edge[0]) === djSet.find(edge[1])) continue;

    djSet.merge(edge[0], edge[1]);
    sum += edge[2];
    mst.callback(edge);
  }

  if (!djSet.parent.every(p => p === djSet.parent[0])) return 0;

  return sum;
}

module.exports = mst;
