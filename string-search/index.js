const _ = require('lodash');
const inquirer = require('inquirer');
const randomWords = require('random-words');

const kmp = require('./kmp');

module.exports = function () {
  inquirer
    .prompt([{
      type: 'input',
      name: 'str',
      message: 'Please input the string',
      default: randomWords(_.random(5, 10)).join(' ')
    }, {
      type: 'input',
      name: 'pattern',
      message: 'Please input the pattern',
      default: randomWords()[0]
    }])
    .then(answers => {
      const { str, pattern } = answers;

      console.log(`KMP_STRING_SEARCH:\n${kmp(str, pattern)}\n`);
    });
};
