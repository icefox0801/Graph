module.exports = function (arr) {
  for (let i = 0; i < arr.length - 1; i++) {
    let ith = i;

    for (let j = i + 1; j < arr.length; j++) {
      if (arr[j] < arr[ith]) ith = j;
    }

    const t = arr[i];
    arr[i] = arr[ith];
    arr[ith] = t;
  }

  return arr;
};
