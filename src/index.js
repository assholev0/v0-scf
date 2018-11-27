const main = require('./main');
const login = require('./login');
const deleter = require('./delete');
const list = require('./list');
const help = require('./help');

const cmds = {
  main,
  delete: deleter,
  list,
  help,
  login
};

const call = new Proxy({}, {
  get: (_, property) => {
    const cmd = property.toLowerCase();
    if (cmds[cmd]) {
      return cmds[cmd];
    }
    return help;
  }
});

module.exports = ([cmd = 'main', functionName = ''] = [], args = {}) => call[cmd](functionName, args);
