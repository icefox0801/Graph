const inquirer = require('inquirer');

const Trie = require('./Trie');

module.exports = async function () {
  const trie = new Trie();
  // eslint-disable-next-line no-constant-condition
  while (true) {
    const answers = await inquirer.prompt([{
      type: 'input',
      message: 'Please input the string or prefix to insert (+) or search (?) or starts with (^)',
      name: 'action',
      default: '',
      validate: input => {
        if (!input) return true;

        return /^[?+^]\s*[a-zA-Z]+/.test(input);
      }
    }]);

    if (!answers.action) break;

    const string = answers.action.replace(/^[?+^]\s*/, '')

    if (answers.action.startsWith('+')) trie.insert(string);

    if (answers.action.startsWith('?')) console.log(trie.search(string));

    if (answers.action.startsWith('^')) console.log(trie.startsWith(string));
  }
};
