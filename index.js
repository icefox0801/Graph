const inquirer = require('inquirer');
const DisjointSet = require('./disjoint-set');

const topological_sorting_directed_bfs_queue = require('./topological-sorting/directed/bfs/queue');
const topological_sorting_directed_dfs_stack = require('./topological-sorting/directed/dfs/stack');
const topological_sorting_directed_dfs_recursion = require('./topological-sorting/directed/dfs/recursion');
const topological_sorting_undirected_bfs_queue = require('./topological-sorting/undirected/bfs/queue');
const topological_sorting_undirected_dfs_stack = require('./topological-sorting/undirected/dfs/stack');
const topological_sorting_undirected_dfs_recursion = require('./topological-sorting/undirected/dfs/recursion');

const traverse = require('./topological-sorting');

const DEFAULT_EDGES = [[1, 2], [2, 3], [1, 4], [2, 5], [2, 6], [3, 6], [4, 8], [5, 7], [5, 8], [6, 8], [8, 9]];

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

const disjointSetPrompt = function () {
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

const topoLogicalSortingPrompt = function () {
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
          message: 'Please input the edges of the directed graph',
          name: 'numbers',
          default: '',
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

      if (!edges.length && size === 10) edges.splice(0, size, ...DEFAULT_EDGES);

      console.log(`[ ${edges.map(edge => `[ ${edge.join(', ')} ]`).join(', ')} ]\n`);

      traverse('TOPOLOGICAL_SORTING_DIRECTED_BFS_QUEUE', topological_sorting_directed_bfs_queue)(size, edges);
      traverse('TOPOLOGICAL_SORTING_DIRECTED_DFS_STACK', topological_sorting_directed_dfs_stack)(size, edges);
      traverse('TOPOLOGICAL_SORTING_DIRECTED_DFS_RECURSION', topological_sorting_directed_dfs_recursion)(size, edges);
      traverse('TOPOLOGICAL_SORTING_UNDIRECTED_BFS_QUEUE', topological_sorting_undirected_bfs_queue)(size, edges);
      traverse('TOPOLOGICAL_SORTING_UNDIRECTED_DFS_STACK', topological_sorting_undirected_dfs_stack)(size, edges);
      traverse('TOPOLOGICAL_SORTING_UNDIRECTED_DFS_RECURSION', topological_sorting_undirected_dfs_recursion)(size, edges);
    });

};

inquirer
  .prompt([{
    type: 'list',
    name: 'entry',
    choices: [
      'disjoint union set',
      'topological sorting'
    ],
    default: 0
  }])
  .then(answers => {
    console.log(answers.entry);
    switch (answers.entry) {
      case 'disjoint set':
        disjointSetPrompt();
        break;
      case 'topological sorting':
        topoLogicalSortingPrompt();
        break;
      default:
        break;
    }
  })
