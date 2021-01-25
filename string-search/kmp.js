function kmp (str, pattern) {
  const next = calNext(pattern);
  let i = 0;
  let j = 0;

  while (i < str.length) {
    if (str[i] === pattern[j]) {
      i++;
      j++;

      if (j === pattern.length) return i - pattern.length;
    } else {
      j = next[j];

      if (j === -1) {
        i++;
        j = 0;
      }
    }
  }

  return -1;
}

function calNext (pattern) {
  const next = Int32Array.from({ length: pattern.length }).fill(-1, 0, 1);

  for (let i = 2, k = 0; i < next.length; i++) {
    if (pattern[i - 1] === pattern[k]) k = next[i] = k + 1;
    else if (k === 0) next[i] = 0;
    else k = next[k], i--;
  }

  return next;
}

module.exports = kmp;
