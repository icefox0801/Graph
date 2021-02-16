/* eslint-disable no-case-declarations */
const inquirer = require('inquirer');

inquirer
  .prompt([{
    type: 'list',
    name: 'entry',
    choices: [
      'sorting',
      'string search',
      'disjoint set',
      'topological sorting',
      'pigeonhole principle',
      'monotonic queue',
      'longest increasing subsequence',
      'priority queue',
      'minimum spanning tree',
      'shortest path',
      'trie'
    ],
    default: 0
  }])
  .then(answers => {
    console.log(answers.entry);
    switch (answers.entry) {
      case 'sorting':
        const sortingPrompt = require('./sorting');
        sortingPrompt();
        break;
      case 'string search':
        const stringSearchPrompt = require('./string-search');
        stringSearchPrompt();
        break;
      case 'disjoint set':
        const disjointSetPrompt = require('./disjoint-set');
        disjointSetPrompt();
        break;
      case 'topological sorting':
        const topoLogicalSortingPrompt = require('./topological-sorting');
        topoLogicalSortingPrompt();
        break;
      case 'pigeonhole principle':
        const pigeonholePrinciplePrompt = require('./pigeonhole-principle');
        pigeonholePrinciplePrompt();
        break;
      case 'monotonic queue':
        const monotonicQueuePrompt = require('./monotonic-queue');
        monotonicQueuePrompt();
        break;
      case 'longest increasing subsequence':
        const lisPrompt = require('./LIS');
        lisPrompt();
        break;
      case 'priority queue':
        const priorityQueuePrompt = require('./priority-queue');
        priorityQueuePrompt();
        break;
      case 'minimum spanning tree':
        const mstPrompt = require('./MST');
        mstPrompt();
        break;
      case 'shortest path':
        const shortestPathPrompt = require('./shortest-path');
        shortestPathPrompt();
        break;
      case 'trie':
        const triePrompt = require('./trie');
        triePrompt();
        break;
      default:
        break;
    }
  })
