module.exports = (title, func) => {
  const result = [];

  func.callback = v => {
    result.push(v);
  }

  return function (...args) {
    func(...args);
    console.log(`${title}:\n${result.join(' → ')}\n`);
  };
};
