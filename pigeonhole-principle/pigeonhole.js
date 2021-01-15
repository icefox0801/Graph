function pigeonhole (nums) {
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] < 0 || nums[i] >= nums.length || nums[i] === i) continue;

    if (nums[i] !== nums[nums[i]]) {
      const t = nums[nums[i]];
      nums[nums[i]] = nums[i];
      nums[i] = t;
      i--;
    }
  }

  for (let i = 0; i < nums.length; i++) {
    if (i !== nums[i]) pigeonhole.callback(i);
  }
}

module.exports = pigeonhole;
