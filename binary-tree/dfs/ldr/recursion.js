function dfs (node) {
  if (node) {
    dfs(node.left);
    dfs.callback(node);
    dfs(node.right);
  }
}

module.exports = dfs;
