const inquirer = require('inquirer');

const randomNumbers = require('../utils/randomNumbers');

const MonotonicQueue = require('./MonotonicQueue');

module.exports = function () {
  inquirer
    .prompt([{
      type: 'input',
      name: 'list',
      message: 'Please input the numbers of the array (empty for random)',
      default: '1 3 2 -1',
      validate: input => {
        const regex = /(\w+(\s+|,|;))*\w+/
        return !input || regex.test(input);
      }
    }])
    .then(async answers => {
      const list = answers.list;
      let nums = [];

      if (!list) {
        nums = await randomNumbers('monotonic');
      } else {
        nums = list.split(/\s+|,|;/).map(r => {
          let n = r.trim();
          return /\d+/.test(n) ? ~~n : 0;
        });
      }

      const minQueue = new MonotonicQueue((a, b) => a - b);
      const maxQueue = new MonotonicQueue((a, b) => b - a);
      let left = 0, right = 0;

      minQueue.push(nums[right]);
      maxQueue.push(nums[right]);

      // eslint-disable-next-line no-constant-condition
      while (true) {
        console.log(`INTERVAL: ${nums.slice(left, right + 1).join(' ')}`);
        console.log(`MAX: ${maxQueue.first()}`);
        console.log(`MIN: ${minQueue.first()}`);

        const answers = await inquirer.prompt([{
          type: 'list',
          name: 'index',
          message: 'Please move forward the left or right pointer',
          choices: [
            { name: `right@${right}`, value: 0 },
            { name: `left@${left}`, value: 1 }
          ],
          default: 0
        }]);

        if (answers.index === 0 && right + 1 > nums.length - 1) {
          console.log('Invalid right index!');
          continue;
        } else if (answers.index === 1 && left + 1 > right) {
          console.log('Invalid left index!');
          continue;
        }

        switch (answers.index) {
          case 0:
            right++;
            minQueue.push(nums[right]);
            maxQueue.push(nums[right]);
            break;
          case 1:
            nums[left] === minQueue.first() && minQueue.shift();
            nums[left] === maxQueue.first() && maxQueue.shift();
            left++;
            break;
          default:
            break;
        }
      }
    });
};
