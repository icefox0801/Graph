const inquirer = require('inquirer');

const wrap = require('../utils/wrap');
const randomGraph = require('../utils/randomGraph');

const topological_sorting_directed_dfs_stack = require('./directed/dfs/stack');
const topological_sorting_directed_bfs_queue = require('./directed/bfs/queue');
const topological_sorting_directed_dfs_recursion = require('./directed/dfs/recursion');
const topological_sorting_undirected_bfs_queue = require('./undirected/bfs/queue');
const topological_sorting_undirected_dfs_stack = require('./undirected/dfs/stack');
const topological_sorting_undirected_dfs_recursion = require('./undirected/dfs/recursion');

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
      let edges = [];

      // eslint-disable-next-line no-constant-condition
      while (true) {
        const answers = await inquirer.prompt([{
          type: 'input',
          message: 'Please input the edges of the directed graph',
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

            if (edges.find(edge => edge[0] === n1 && edge[1] === n2)) return false;

            return true;
          }
        }]);

        if (!answers.numbers) break;

        const numbers = answers.numbers.split(/\s+|,|;/).map(r => ~~r.trim());
        edges.push(numbers);
      }

      if (!edges.length) edges = randomGraph('ts', size);

      console.log(`[ ${edges.map(edge => `[ ${edge.join(', ')} ]`).join(', ')} ]\n`);

      wrap('TOPOLOGICAL_SORTING_DIRECTED_BFS_QUEUE', topological_sorting_directed_bfs_queue)(size, edges);
      wrap('TOPOLOGICAL_SORTING_DIRECTED_DFS_STACK', topological_sorting_directed_dfs_stack)(size, edges);
      wrap('TOPOLOGICAL_SORTING_DIRECTED_DFS_RECURSION', topological_sorting_directed_dfs_recursion)(size, edges);
      wrap('TOPOLOGICAL_SORTING_UNDIRECTED_BFS_QUEUE', topological_sorting_undirected_bfs_queue)(size, edges);
      wrap('TOPOLOGICAL_SORTING_UNDIRECTED_DFS_STACK', topological_sorting_undirected_dfs_stack)(size, edges);
      wrap('TOPOLOGICAL_SORTING_UNDIRECTED_DFS_RECURSION', topological_sorting_undirected_dfs_recursion)(size, edges);
    });
};
