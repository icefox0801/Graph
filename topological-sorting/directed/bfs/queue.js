function bfs (n, edges) {
  const afters = Array.from({ length: n }, () => []);
  const indegrees = Array(n).fill(0);

  for (let edge of edges) {
    afters[edge[0]].push(edge[1]);
    indegrees[edge[1]]++;
  }

  const queue = [];

  for (let i = 0; i < indegrees.length; i++) {
    if (indegrees[i] === 0) queue.push(i);
  }

  while (queue.length) {
    const p = queue.shift();
    bfs.callback(p);

    for (let v of afters[p]) {
      indegrees[v]--;

      if (indegrees[v] === 0) queue.push(v);
    }
  }
}

module.exports = bfs;
