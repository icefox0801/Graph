const _ = require('lodash');

const MIN_FACTOR = 10;
const MAX_FACTOR = 20;

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

function randomPair (size, order = true) {
  let i = _.random(0, size - 1);
  let j = _.random(0, size - 1);

  while (i === j) {
    i = _.random(0, size - 1);
    j = _.random(0, size - 1);
  }

  if (order && i > j) {
    j = i + j;
    i = j - i;
    j = j - i;
  }

  return [i, j];
}

function weight (type, i, j, size) {
  let w = 0;
  let d = Math.abs(j - i);
  let shortFactor  = ~~(d * Math.log2(Math.max(size, MIN_FACTOR)));
  let mstFactor = Math.min(Math.max(size, MIN_FACTOR), MAX_FACTOR);

  switch (type) {
    case 'sp':
      w = _.random(0, d * d) > size / 5 ? -1 : _.random(1, shortFactor);
      break;
    case 'mst':
      w = _.random(0, 1) ? -1 : _.random(1, mstFactor);
      break;
    default:
      break;
  }

  return w;
}

function generateMST (size) {
  const djSet = new DisjointSet(size);
  const edges = [];
  let count = Math.random(size * 3, size * (size - 1) / 2);

  function addToEdges (type, x, y, w) {
    if (~w && !edges.some(edge => edge[0] === x && edge[1] === y)) {
      edges.push([x, y, w]);
      djSet.merge(x, y);
    }
  }

  while (djSet.count > 1 || count-- > 0) {
    const [i, j] = randomPair(size, false);
    const w = weight('mst', i, j, size);
    addToEdges('mst', i, j, w);
  }

  edges.sort((a, b) => a[0] - b[0] || a[1] - b[1]);

  return edges;
}

function generateCG (size) {
  const edges = [];

  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
      if (i !== j) {
        const w = weight('sp', i, j, size);

        if (~w) edges.push([i, j, w]);
      }
    }
  }

  return edges;
}

function generateDAG (size) {
  const djSet = new DisjointSet(size);
  const edges = [];
  let count = _.random(0, 1) ? size - 1 : _.random(Math.floor(size / 2), size - 1);

  while (count > 0) {
    const [i, j] = randomPair(size);

    if (djSet.find(i) !== djSet.find(j)) {
      edges.push([i, j]);
      djSet.merge(i, j);
      count--;
    }
  }

  edges.sort((a, b) => a[0] - b[0] || a[1] - b[1]);

  return edges;
}

module.exports = function (type, size) {
  switch (type) {
    case 'ts':
      return generateDAG(size);
    case 'sp':
      return generateCG(size);
    case 'mst':
      return generateMST(size);
    default:
      break;
  }
};
