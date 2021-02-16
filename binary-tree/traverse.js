module.exports = (title, traverse) => {
  const result = [];

  traverse.callback = node => {
    result.push(node.val);
  }

  return function (nodes) {
    traverse(nodes);
    console.log(`${title}:\n${result.join(' → ')}\n`);
  };
};
