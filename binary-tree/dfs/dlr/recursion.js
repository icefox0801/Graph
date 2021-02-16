function dfs (node) {
  if (node) {
    dfs.callback(node);
    dfs(node.left);
    dfs(node.right);
  }
}

module.exports = dfs;
