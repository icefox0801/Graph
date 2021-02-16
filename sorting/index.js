const inquirer = require('inquirer');

const wrap = require('../utils/wrap');
const randomNumbers = require('../utils/randomNumbers');

const selectionSort = require('./selection-sort');
const insertionSort = require('./insertion-sort');
const bubbleSort = require('./bubble-sort');
const quickSort = require('./quick-sort');
const heapSort = require('./heap-sort');
const mergeSort = require('./merge-sort');
const countingSort = require('./counting-sort');

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
        nums = await randomNumbers('sorting');
      } else {
        nums = list.split(/\s+|,|;/).map(r => {
          let n = r.trim();
          return /\d+/.test(n) ? ~~n : 0;
        });
      }

      wrap('SELECTION SORT:', selectionSort, false)(nums.slice());
      wrap('INSERTION SORT:', insertionSort, false)(nums.slice());
      wrap('BUBBLE SORT:', bubbleSort, false)(nums.slice());
      wrap('QUICK SORT:', quickSort, false)(nums.slice());
      wrap('HEAP SORT:', heapSort, false)(nums.slice());
      wrap('MERGE SORT:', mergeSort, false)(nums.slice());
      wrap('COUNTING SORT:', countingSort, false)(nums.slice());
    });
};
