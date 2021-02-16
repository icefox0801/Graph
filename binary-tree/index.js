const inquirer = require('inquirer');
const TreeNode = require('./TreeNode');

const dfs_dlr_recursion = require('./dfs/dlr/recursion');
const dfs_dlr_stack = require('./dfs/dlr/stack');
const dfs_ldr_recursion = require('./dfs/ldr/recursion');
const dfs_ldr_stack = require('./dfs/ldr/stack');
const dfs_lrd_recursion = require('./dfs/lrd/recursion');
const dfs_lrd_stack = require('./dfs/lrd/stack');

const bfs_queue = require('./bfs/queue');

const traverse = require('./traverse');

module.exports = function () {
  inquirer
    .prompt([{
      type: 'input',
      name: 'list',
      message: 'Please input tree node list',
      default: '1 2 3 4 5 6 7 8 9 10 11 12 13 14 15',
      validate: input => {
        const regex = /(\w+(\s+|,|;))*\w+/
        return regex.test(input);
      }
    }])
    .then(answers => {
      const list = answers.list;
      const nodes = list.split(/\s+|,|;/).map(r => {
        let n = r.trim();

        if (/\d+/.test(n)) {
          return new TreeNode(~~n);
        } else if (n === 'null' || n === '-') {
          return null;
        } else {
          return new TreeNode(n);
        }
      });

      const root = nodes[0];
      let p = 0, q = 1;

      while (q < nodes.length) {
        if (nodes[p]) {
          nodes[p].left = nodes[q++];
          nodes[p].right = nodes[q++];
        }

        p++;
      }

      traverse('DFS-DLR-RECURSION', dfs_dlr_recursion)(root);
      traverse('DFS-DLR-STACK', dfs_dlr_stack)(root);
      traverse('DFS-LDR-RECURSION', dfs_ldr_recursion)(root);
      traverse('DFS-LDR-STACK', dfs_ldr_stack)(root);
      traverse('DFS-LRD-RECURSION', dfs_lrd_recursion)(root);
      traverse('DFS-LRD-STACK', dfs_lrd_stack)(root);
      traverse('BFS-QUEUE', bfs_queue)(root);
    });
}
