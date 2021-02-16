function dfs (node) {
  if (!node) return;

  const stack = [];
  stack.push(node);

  while (stack.length) {
    const p = stack.pop();
    dfs.callback(p);

    if (p.right) stack.push(p.right);

    if (p.left) stack.push(p.left);
  }
}

module.exports = dfs;
