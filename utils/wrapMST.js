module.exports = (title, func) => {
  const result = [];

  func.callback = edge => {
    result.push(`[ ${edge[0]}, ${edge[1]}, ${edge[2]} ]`);
  }

  return function (...args) {
    const sum = func(...args);

    if (!sum) result.splice(0);

    console.log(`${title}`);
    console.log(`SUM: ${sum}`);
    console.log(`EDGES: ${result.join(', ')}`);
  };
};
