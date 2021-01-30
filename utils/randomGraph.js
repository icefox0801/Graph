const _ = require('lodash');

const MIN_FACTOR = 10;

class DisjointSet {
  constructor (size) {
    this.parent = Array.from({ length: size }, (v, k) => k);
    this.rank = Array(size).fill(0);
    this.count = size;
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

    this.count--;
  }
}


function weight (type, i, j, size) {
  let w = 0;
  let factor = Math.max(size, MIN_FACTOR);
  let d = Math.abs(j - i);

  switch (type) {
    case 'short':
      w = _.random(0, d * d) > size / 5 ? -1 : _.random(1, ~~(d * Math.log2(factor)));
      break;
    case 'mst':
      w = _.random(0, 1) ? -1 : _.random(1, factor);
      break;
    default:
      break;
  }

  return w;
}

function generate (size, { type = 'mst' } = {}) {
  const djSet = new DisjointSet(size);
  const edges = [];

  function addToEdges (x, y, w) {
    if (~w && !edges.some(edge => edge[0] === x && edge[1] === y)) {
      edges.push([x, y, w]);
      djSet.merge(x, y);
    }
  }

  for (let i = 0; i < size; i++) {
    for (let j = i + 1; j < size; j++) {
      const w = weight(type, i, j, size);
      addToEdges(i, j, w);
    }
  }

  while (djSet.count > 1) {
    let trees = Array.from(new Set(djSet.parent)).sort((a, b) => a - b);
    trees.reduce((p, c) => {
      if (!_.isUndefined(p)) {
        const w = weight(type, c, p, size);
        addToEdges(p, c, w);
      }

      return c;
    });
  }

  edges.sort((a, b) => a[0] - b[0] || a[1] - b[1]);

  return edges;
}

module.exports = generate;
