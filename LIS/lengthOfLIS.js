function lowerBound (nums, target) {
  let l = 0, r = nums.length - 1, mid;

  while (mid = Math.floor((l + r) / 2), l < r) {
    if (nums[mid] > target) r = mid;
    else l = mid + 1;
  }

  return l;
}

function upperBound (nums, target) {
  let l = 0, r = nums.length - 1, mid;

  while (mid = Math.floor((l + r) / 2), l < r) {
    if (nums[mid] < target) r = mid;
    else l = mid + 1;
  }
}

function lengthOfLIS (nums) {
  if (!nums.length) return 0;

  const dp = [];
  dp.push(nums[0]);

  for (let n of nums) {
    if (n > dp[dp.length - 1]) dp.push(n);
    else dp[lowerBound(dp, n)] = n;
  }

  return dp.length;
}

function lengthOfLDS (nums) {
  if (!nums.length) return 0;

  const dp = [];
  dp.push(nums[0]);

  for (let n of nums) {
    if (n < dp[dp.length - 1]) dp.push(n);
    else dp[upperBound(dp, n)] = n;
  }

  return dp.length;
}

module.exports = lengthOfLIS;
exports.lengthOfLIS = lengthOfLIS;
exports.lengthOfLDS = lengthOfLDS;
