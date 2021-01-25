const A_CODE = 'a'.charCodeAt();

class TrieNode {
  constructor () {
    this.isVal = false;
    this.childNode = Array(26).fill(null);
  }
}

class Trie {
  constructor () {
    this.root = new TrieNode();
  }

  insert (word) {
    let temp = this.root;

    for (let c of word) {
      const code = c.charCodeAt() - A_CODE;

      if (!temp.childNode[code]) temp.childNode[code] = new TrieNode();

      temp = temp.childNode[code];
    }

    temp.isVal = true;
  }

  search (word) {
    let temp = this.root;

    for (let c of word) {
      if (!temp) break;

      let code = c.charCodeAt() - A_CODE;
      temp = temp.childNode[code];
    }

    return temp ? temp.isVal : false;
  }

  startsWith (prefix) {
    let temp = this.root;

    for (let c of prefix) {
      if (!temp) break;

      let code = c.charCodeAt() - A_CODE;
      temp = temp.childNode[code];
    }

    return !!temp;
  }
}

module.exports = Trie;
