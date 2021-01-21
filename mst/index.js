const inquirer = require('inquirer');

const wrap = require('../utils/wrapMST');

const prim_mst = require('./prim');
const kruskal_mst = require('./kruskal');

const DEFAULT_EDGES = [
  [0, 1, 4],
  [0, 3, 5],
  [0, 5, 1],
  [1, 2, 6],
  [1, 4, 7],
  [1, 7, 5],
  [1, 6, 3],
  [1, 8, 8],
  [2, 3, 8],
  [2, 5, 4],
  [2, 6, 5],
  [3, 4, 6],
  [3, 5, 4],
  [3, 6, 8],
  [4, 8, 11],
  [5, 7, 2],
  [5, 8, 7],
  [6, 8, 7],
  [8, 9, 8]
];

module.exports = function () {
  inquirer
    .prompt([{
      type: 'number',
      name: 'size',
      message: 'Please input the size of graph',
      default: '10',
      validate: value => {
        return value > 0 && value < 200;
      }
    }])
    .then(async answers => {
      const size = ~~answers.size;
      const edges = [];

      // eslint-disable-next-line no-constant-condition
      while (true) {
        const answers = await inquirer.prompt([{
          type: 'input',
          message: 'Please input the weighted edges of the graph',
          name: 'numbers',
          default: '0,1,5',
          validate: input => {
            if (!input) return true;

            const regex = /\d+(\s+|,|;)\d+(\s+|,|;)\d+/;

            if (!regex.test(input)) return false;

            const [n1, n2] = input.split(/\s+|,|;/).map(r => ~~r.trim());

            if (n1 === n2) return false;

            if (n1 < 0 || n1 > size) return false;

            if (n2 < 0 || n2 > size) return false;

            if (edges.find(edge => edge[0] === n1 && edge[1] === n2)) return false;

            return true;
          }
        }]);

        if (!answers.numbers) break;

        const numbers = answers.numbers.split(/\s+|,|;/).map(r => ~~r.trim());
        edges.push(numbers);
      }

      if (!edges.length && size === 10) edges.splice(0, size, ...DEFAULT_EDGES);

      console.log(`[ ${edges.map(edge => `[ ${edge.join(', ')} ]`).join(', ')} ]\n`);

      wrap('PRIM_ALGORITHM', prim_mst)(size, edges);
      wrap('KRUSKAL_ALGORITHM', kruskal_mst)(size, edges);
    });
};
