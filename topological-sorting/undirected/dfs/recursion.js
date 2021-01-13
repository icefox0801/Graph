function dfs (n, edges) {
  const neighbors = Array.from({ length: n }, () => []);

  for (let edge of edges) {
    neighbors[edge[0]].push(edge[1]);
    neighbors[edge[1]].push(edge[0]);
  }

  const visited = new Set();

  function traverse (s) {
    dfs.callback(s);

    for (let e of neighbors[s]) {
      if (!visited.has(e)) {
        visited.add(e);
        traverse(e);
      }
    }
  }

  while (visited.size < n) {
    for (let i = 0; i < n; i++) {
      if (!visited.has(i)) {
        visited.add(i);
        traverse(i);
        break;
      }
    }
  }
}

module.exports = dfs;
