const main = require('./main');
const login = require('./login');
const help = require('./help');

const cmds = {
  main,
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
