const inquirer = require('inquirer');

const randomNumbers = require('../utils/randomNumbers');

const lengthOfLIS = require('./lengthOfLIS');

module.exports = function () {
  inquirer
    .prompt([{
      type: 'input',
      name: 'list',
      message: 'Please input the numbers of the array (empty for random)',
      default: '2 1 4 3',
      validate: input => {
        const regex = /(\w+(\s+|,|;))*\w+/
        return !input || regex.test(input);
      }
    }])
    .then(async answers => {
      const list = answers.list;
      let nums = [];

      if (!list) {
        nums = await randomNumbers('LIS');
      } else {
        nums = list.split(/\s+|,|;/).map(r => {
          let n = r.trim();
          return /\d+/.test(n) ? ~~n : 0;
        });
      }

      console.log(`LENGTH_OF_LIS: ${lengthOfLIS(nums)}`);
    })
};
