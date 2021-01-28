const inquirer = require('inquirer');

const stringSearchPrompt = require('./string-search');
const disjointSetPrompt = require('./disjoint-set');
const topoLogicalSortingPrompt = require('./topological-sorting');
const pigeonholePrinciplePrompt = require('./pigeonhole-principle');
const priorityQueuePrompt = require('./priority-queue');
const mstPrompt = require('./MST');
const triePrompt = require('./trie');
const lisPrompt = require('./LIS');

inquirer
  .prompt([{
    type: 'list',
    name: 'entry',
    choices: [
      'string search',
      'disjoint set',
      'topological sorting',
      'pigeonhole principle',
      'longest increasing subsequence',
      'priority queue',
      'minimum spanning tree',
      'trie'
    ],
    default: 0
  }])
  .then(answers => {
    console.log(answers.entry);
    switch (answers.entry) {
      case 'string search':
        stringSearchPrompt();
        break;
      case 'disjoint set':
        disjointSetPrompt();
        break;
      case 'topological sorting':
        topoLogicalSortingPrompt();
        break;
      case 'pigeonhole principle':
        pigeonholePrinciplePrompt();
        break;
      case 'longest increasing subsequence':
        lisPrompt();
        break;
      case 'priority queue':
        priorityQueuePrompt();
        break;
      case 'minimum spanning tree':
        mstPrompt();
        break;
      case 'trie':
        triePrompt();
        break;
      default:
        break;
    }
  })
