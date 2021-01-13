module.exports = (title, traverse) => {
  const result = [];

  traverse.callback = v => {
    result.push(v);
  }

  return function (n, edges) {
    traverse(n, edges);
    console.log(`${title}:\n${result.join(' → ')}\n`);
  };
};
