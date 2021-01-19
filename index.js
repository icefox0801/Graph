const inquirer = require('inquirer');

const disjointSetPrompt = require('./disjoint-set');
const topoLogicalSortingPrompt = require('./topological-sorting');
const pigeonholePrinciplePrompt = require('./pigeonhole-principle');
const priorityQueuePrompt = require('./priority-queue');

inquirer
  .prompt([{
    type: 'list',
    name: 'entry',
    choices: [
      'disjoint set',
      'topological sorting',
      'pigeonhole principle',
      'priority queue'
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
      case 'pigeonhole principle':
        pigeonholePrinciplePrompt();
        break;
      case 'priority queue':
        priorityQueuePrompt();
        break;
      default:
        break;
    }
  })
