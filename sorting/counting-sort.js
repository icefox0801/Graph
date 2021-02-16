module.exports = function (arr) {
  let min = Infinity, max = -Infinity;

  for (let n of arr) {
    min = Math.min(n, min);
    max = Math.max(n, max);
  }

  for (let i = 0; i < arr.length; i++) arr[i] -= min;

  const result = [];
  const count = new Int16Array(max - min + 1);

  for (let n of arr) count[n]++;

  for (let i = 1; i < count.length; i++) count[i] += count[i - 1];

  for (let i = arr.length - 1; i >= 0; i--) {
      result[count[arr[i]] - 1] = arr[i] + min;
      count[arr[i]]--;
  }

  return result;
};
