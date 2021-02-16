module.exports = function (arr) {
  let flag = true;

  while (flag) {
    flag = false;

    for (let i = 0; i < arr.length - 1; i++) {
      if (arr[i] > arr[i + 1]) {
        flag = true;
        const t = arr[i];
        arr[i] = arr[i + 1];
        arr[i + 1] = t;
      }
    }
  }

  return arr;
};
