const inquirer = require('inquirer');

const kmp = require('./kmp');

module.exports = function () {
  inquirer
    .prompt([{
      type: 'input',
      name: 'str',
      message: 'Please input the string',
      default: 'bbc abcdab abcdabcdabde'
    }, {
      type: 'input',
      name: 'pattern',
      message: 'Please input the pattern',
      default: 'abcdabd'
    }])
    .then(answers => {
      const { str, pattern } = answers;

      console.log(`KMP_STRING_SEARCH:\n${kmp(str, pattern)}\n`);
    });
};
