module.exports = function (arr) {
  function swap (x, y) {
    const t = arr[x];
    arr[x] = arr[y];
    arr[y] = t;
  }

  function maxHeapify (start, end) {
    let dad = start;
    let son = dad * 2 + 1;

    if (son >= end) return;

    if (son + 1 < end && arr[son] < arr[son + 1]) son++;

    if (arr[dad] <= arr[son]) {
      swap(dad, son);
      maxHeapify(son, end);
    }
  }

  for (let i = arr.length - 1 >> 1; i >= 0; i--) {
    maxHeapify(i, arr.length);
  }

  for (let i = arr.length - 1; i > 0; i--) {
    swap(0, i);
    maxHeapify(0, i);
  }

  return arr;
};
