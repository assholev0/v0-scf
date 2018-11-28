const main = require('./main');
const login = require('./login');
const create = require('./create');
const deleter = require('./delete');
const update = require('./update');
const list = require('./list');
const help = require('./help');

const cmds = {
  main,
  create,
  delete: deleter,
  update,
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

module.exports = ([cmd = 'main', functionName = ''] = []) => call[cmd](functionName);
