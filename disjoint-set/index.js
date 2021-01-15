const inquirer = require('inquirer');
const DisjointSet = require('./DisjointSet');

const divide = function (dj_set) {
  const sets = Array.from(dj_set.parent, () => []);

  for (let i = 0; i < dj_set.parent.length; i++) {
    const p = dj_set.find(i);
    sets[p].push(i);
  }

  return sets
    .filter(set => set.length)
    .map(set => `( ${set.join(', ')} )`)
    .join(' ')
};

module.exports = function () {
  inquirer
    .prompt([{
      type: 'number',
      name: 'size',
      message: 'Please input the size of disjoint union set',
      default: '10',
      validate: value => {
        return value > 0 && value < 200;
      }
    }])
    .then(async answers => {
      const size = ~~answers.size;
      const dj_set = new DisjointSet(size);
      console.log(divide(dj_set));

      // eslint-disable-next-line no-constant-condition
      while (true) {
        const answers = await inquirer.prompt([{
          type: 'input',
          message: 'Please input the two numbers to union with',
          name: 'numbers',
          default: '0,1',
          validate: input => {
            if (!input) return true;

            const regex = /\d+(\s+|,|;)\d+/;

            if (!regex.test(input)) return false;

            const [n1, n2] = input.split(/\s+|,|;/).map(r => ~~r.trim());

            if (n1 === n2) return false;

            if (n1 < 0 || n1 > size) return false;

            if (n2 < 0 || n2 > size) return false;

            return true;
          }
        }]);

        if (!answers.numbers) break;

        const numbers = answers.numbers.split(/\s+|,|;/).map(r => ~~r.trim());
        dj_set.merge(numbers[0], numbers[1]);
        console.log(divide(dj_set));
      }
    });
};
