function dfs (node) {
  const stack = [];
  let p = node;

  while (stack.length || p) {
    if (p) {
      stack.push(p);
      p = p.left;
    } else {
      p = stack.pop();
      dfs.callback(p);
      p = p.right;
    }
  }
}

module.exports = dfs;
