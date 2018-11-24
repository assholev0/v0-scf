const main = require('./main');
const help = require('./help');

const cmds = {
  main,
  help
};

const call = new Proxy({}, {
  get: (_, property) => {
    const cmd = property.toLowerCase();
    if (cmds[cmd]) {
      return cmds[cmd];
    }
    return cmds[help];
  }
});

module.exports = ([cmd = 'main', functionName = ''] = [], args = {}) => call[cmd](functionName, args);
