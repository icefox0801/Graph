module.exports = function (arr) {
  function merge (left, right) {
    const result = [];

    while (left.length && right.length) {
      if (left[0] < right[0]) result.push(left.shift())
      else result.push(right.shift())
    }

    return result.concat(left, right);
  }

  function mergeSort (arr) {
    if (arr.length <= 1) return arr;

    const m = arr.length >> 1;
    const left = arr.slice(0, m);
    const right = arr.slice(m);

    return merge(mergeSort(left), mergeSort(right));
  }

  return mergeSort(arr);
};
