function dfs (node) {
  if (node) {
    dfs(node.left);
    dfs(node.right);
    dfs.callback(node);
  }
}

module.exports = dfs;
