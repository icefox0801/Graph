const inquirer = require('inquirer');

const wrap = require('../utils/wrap');
const randomNumbers = require('../utils/randomNumbers');

const pigeonhole = require('./pigeonhole');

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
        nums = await randomNumbers('pigeonhole');
      } else {
        nums = list.split(/\s+|,|;/).map(r => {
          let n = r.trim();
          return /\d+/.test(n) ? ~~n : 0;
        });
      }

      wrap('MISSING_PIGEONS', pigeonhole)(nums);
    })
};
