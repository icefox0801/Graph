function dfs (node) {
  if (!node) return;

  const stack1 = [];
  const stack2 = [];
  stack1.push(node);

  while (stack1.length) {
    const p = stack1.pop();
    stack2.push(p);

    if (p.left) stack1.push(p.left);

    if (p.right) stack1.push(p.right);
  }

  while(stack2.length) {
    dfs.callback(stack2.pop());
  }
}

module.exports = dfs;
