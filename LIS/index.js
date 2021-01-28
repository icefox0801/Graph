const inquirer = require('inquirer');

const lengthOfLIS = require('./lengthOfLIS');

module.exports = function () {
  inquirer
    .prompt([{
      type: 'input',
      name: 'list',
      message: 'Please input the numbers of the array',
      default: '3 12 3 2 6 10 11 20 9 10 5 -1 8 7 1 0 14',
      validate: input => {
        const regex = /(\w+(\s+|,|;))*\w+/
        return regex.test(input);
      }
    }])
    .then(answers => {
      const list = answers.list;
      const nums = list.split(/\s+|,|;/).map(r => {
        let n = r.trim();
        return /\d+/.test(n) ? ~~n : 0;
      });

      console.log(lengthOfLIS(nums));
    })
};
