const help = require('./help');

const call = {
  help
};

module.exports = (cmd = '', functionName = '', args = {}) => call[cmd](functionName, args);
