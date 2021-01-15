const inquirer = require('inquirer');

const disjointSetPrompt = require('./disjoint-set');
const topoLogicalSortingPrompt = require('./topological-sorting');
const pigeonholePrinciplePrompt = require('./pigeonhole-principle');

inquirer
  .prompt([{
    type: 'list',
    name: 'entry',
    choices: [
      'disjoint set',
      'topological sorting',
      'pigeonhole principle'
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
      default:
        break;
    }
  })
