function bfs (node) {
  if (!node) return;

  const queue = [];

  queue.push(node);

  while(queue.length) {
    const p = queue.shift();
    bfs.callback(p);

    if (p.left) queue.push(p.left);

    if (p.right) queue.push(p.right);
  }
}

module.exports = bfs;
