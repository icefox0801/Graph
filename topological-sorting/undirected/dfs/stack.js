function dfs (n, edges) {
  const neighbors = Array.from({ length: n }, () => []);

  for (let edge of edges) {
    neighbors[edge[0]].push(edge[1]);
    neighbors[edge[1]].push(edge[0]);
  }

  const visited = new Set();

  while (visited.size < n) {
    let i = -1;
    let stack = [];

    while (++i < n) {
      if (!visited.has(i)) {
        stack.push(i);
        visited.add(i);
        break;
      }
    }

    while (stack.length) {
      const s = stack.pop();
      dfs.callback(s);

      for (let e of neighbors[s]) {
        if (!visited.has(e)) {
          stack.push(e);
          visited.add(e);
        }
      }
    }
  }
}

module.exports = dfs;
