const inquirer = require('inquirer');

const PriorityQueue = require('./PriorityQueue');

module.exports = function () {
  inquirer
    .prompt([{
      type: 'list',
      name: 'type',
      message: 'Please input the type of priority queue',
      choices: [
        'max heap',
        'min heap'
      ],
      default: 'max heap'
    }])
    .then(async answers => {
      let heap = null;

      if (answers.type === 'min heap') {
        heap = new PriorityQueue((a, b) => a - b);
      } else {
        heap = new PriorityQueue((a, b) => b - a);
      }

      // eslint-disable-next-line no-constant-condition
      while (true) {
        const answers = await inquirer.prompt([{
          type: 'input',
          message: 'Please input the number to push (>) or pop (<)',
          name: 'action',
          default: '',
          validate: input => {
            if (!input) return true;

            if (input === '<') return true;

            return />\s*-?[\d]+/.test(input);
          }
        }]);

        if (!answers.action) break;

        const number = ~~answers.action.replace(/>\s*/, '')

        if (answers.action.startsWith('>')) heap.push(number);

        if (answers.action === '<') heap.pop();

        console.log(heap.heap.join(', '));
      }
    })
};
