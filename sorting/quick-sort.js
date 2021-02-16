module.exports = function (arr) {
  function quickSort (l, r) {
    if (l >= r) return;

    let i = l, j = r, temp = arr[j];

    while (i !== j) {
      while (i < j && arr[i] <= temp) i++;

      arr[j] = arr[i];

      while (i < j && arr[j] >= temp) j--;

      arr[i] = arr[j];
    }

    arr[j] = temp;
    quickSort(l, j - 1);
    quickSort(j + 1, r);
  }

  quickSort(0, arr.length - 1);
  return arr;
};
