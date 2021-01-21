function mst (n, edges) {
  if (!edges.length) return 0;

  const graph = Array.from(
    { length: n },
    () => Array(n).fill(Infinity)
  );

  const results = Array.from(
    { length: n },
    () => Uint8Array.from({ length: n }).fill(n)
  );

  for (let e = 0; e < edges.length; e++) {
    const edge = edges[e];
    const [i, j, weight] = edge;
    graph[i][j] = weight;
    graph[j][i] = weight;
    results[i][j] = results[j][i] = e;
  }

  let sum = 0;
  const visited = new Set();
  const distance = Array(n).fill(Infinity).fill(0, 0, 1);
  const adjoint = Int16Array.from({ length: n }).fill(-1);

  while (visited.size < n) {
    let node = -1;
    let e = n;
    let min = Infinity;

    for (let j = 0; j < n; j++) {
      if (distance[j] < min && !visited.has(j)) {
        min = distance[j];
        e = adjoint[j];
        node = j;
      }
    }

    if (!~node) return 0;

    visited.add(node);
    sum += distance[node];

    if (edges[e]) mst.callback(edges[e]);

    for (let next = 0; next < graph[node].length; next++) {
      if (graph[node][next] < distance[next] && !visited.has(next)) {
        distance[next] = graph[node][next];
        adjoint[next] = results[node][next];
      }
    }
  }

  return sum;
}

module.exports = mst;
