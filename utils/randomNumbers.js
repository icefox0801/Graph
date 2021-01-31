const _ = require('lodash');
const inquirer = require('inquirer');

async function generate (type = 'pigeonhole') {
  const { size } = await inquirer.prompt([{
    type: 'number',
    name: 'size',
    message: 'Please input the size of random numbers',
    default: '10',
    validate: value => {
      return value > 0 && value < 200;
    }
  }]);

  let shuffled;

  switch (type) {
    case 'pigeonhole':
      shuffled = _.shuffle(Array.from({ length: size }, (v, k) => k));

      while (_.random(0, Math.max(~~(size / 5), 1))) shuffled[_.random(0, size - 1)] = -1;

      break;
    case 'LIS':
      shuffled = _.shuffle(Array.from({ length: size }, () => _.random(-size, size - 1)));
      break;
    default:
      break;
  }

  console.log(`RANDOM NUMBERS: ${shuffled.join(' ')}`);

  return shuffled
}

module.exports = generate;
