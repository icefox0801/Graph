module.exports = class DisjointUnionSet {
  constructor (size) {
    this.parent = Array.from({ length: size }, (v, k) => k);
    this.rank = Array(size).fill(0);
  }

  find (x) {
    return this.parent[x] === x ? this.parent[x] : (this.parent[x] = this.find(this.parent[x]));
  }

  merge (x, y) {
    const rx = this.find(x);
    const ry = this.find(y);

    if (rx === ry) return;

    if (this.rank[rx] > this.rank[ry]) {
      this.parent[rx] = ry;
    } else if (this.rank[rx] < this.rank[rx]) {
      this.parent[ry] = rx;
    } else {
      this.parent[rx] = ry;
      this.rank[ry]++;
    }
  }
}
