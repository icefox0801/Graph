module.exports = (title, func, traverse = true) => {
  const result = [];

  func.callback = v => {
    result.push(v);
  }

  return function (...args) {
    const r = func(...args);

    if (!traverse) {
      console.log(`${title}:\n${r.join(' → ')}\n`);
    } else {
      console.log(`${title}:\n${result.join(' → ')}\n`);
    }
  };
};
