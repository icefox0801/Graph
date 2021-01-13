function dfs (n, edges) {
  const afters = Array.from({ length: n }, () => []);
  const indegrees = Array(n).fill(0);

  for (let edge of edges) {
    afters[edge[0]].push(edge[1]);
    indegrees[edge[1]]++;
  }

  const stack = [];

  for (let i = indegrees.length - 1; i >= 0; i--) {
    if (indegrees[i] === 0) stack.push(i);
  }

  while (stack.length) {
    const p = stack.pop();
    dfs.callback(p);

    for (let k = afters[p].length - 1; k >= 0; k--) {
      const v = afters[p][k];

      indegrees[v]--;

      if (indegrees[v] === 0) stack.push(v);
    }
  }
}

module.exports = dfs;
