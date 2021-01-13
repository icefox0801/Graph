function dfs (n, edges) {
  const afters = Array.from({ length: n }, () => []);
  const indegrees = Array(n).fill(0);

  for (let edge of edges) {
    afters[edge[0]].push(edge[1]);
    indegrees[edge[1]]++;
  }

  const visited = new Set();

  function traverse (p) {
    dfs.callback(p);

    for (let v of afters[p]) {
      indegrees[v]--;

      if (indegrees[v] === 0) {
        visited.add(v);
        traverse(v);
      }
    }
  }

  for (let i = 0; i < indegrees.length; i++) {
    if (indegrees[i] === 0 && !visited.has(i)) {
      visited.add(i);
      traverse(i);
    }
  }
}

module.exports = dfs;
