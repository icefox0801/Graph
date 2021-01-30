function floyd (n, edges) {
  const dist = Array.from(
    { length: n },
    (v, k) => Array(n).fill(Infinity).fill(0, k, k + 1)
  );

  for (let [x, y, w] of edges) {
    dist[x][y] = w;
  }

  for (let k = 0; k < n; k++) {
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n; j++) {
        if (dist[i][j] > dist[i][k] + dist[k][j]) dist[i][j] = dist[i][k] + dist[k][j];
      }
    }
  }

  return dist[0][n - 1];
}

module.exports = floyd;
