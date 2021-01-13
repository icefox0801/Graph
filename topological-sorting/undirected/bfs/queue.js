function bfs (n, edges) {
  const neighbors = Array.from({ length: n }, () => []);

  for (let edge of edges) {
    neighbors[edge[0]].push(edge[1]);
    neighbors[edge[1]].push(edge[0]);
  }

  const visited = new Set();

  while (visited.size < n) {
    let i = -1;
    const queue = [];

    while (++i < n) {
      if (!visited.has(i)) {
        queue.push(i);
        visited.add(i);
        break;
      }
    }

    while (queue.length) {
      const s = queue.shift();
      bfs.callback(s);

      for (let e of neighbors[s]) {
        if (!visited.has(e)) {
          queue.push(e);
          visited.add(e);
        }
      }
    }
  }
}

module.exports = bfs;
