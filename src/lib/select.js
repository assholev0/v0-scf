const inquirer = require('inquirer');
const fs = require('fs');

module.exports = () => {
  const files = fs.readdirSync('.', { withFileTypes: true });
  const dirs = files.filter(x => x.isDirectory() && !x.name.startsWith('.') && x.name !== 'node_modules').map(x => x.name);
  return inquirer.prompt([{
    type: 'list',
    name: 'functionName',
    message: '选择本地云函数',
    choices: dirs
  }]).then(({ functionName }) => functionName);
};
