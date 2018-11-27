const fs = require('fs');
const chalk = require('chalk');
const { SCF } = require('wqcloud');
const { globalPath, localPath } = require('../config');

module.exports = () => {
  if (!fs.existsSync(localPath) && !fs.existsSync(globalPath)) {
    // eslint-disable-next-line no-console
    console.log(chalk`请先执行 {red.bold csf loign} 进行登录`);
    process.exit(0);
  }
  const config = fs.readFileSync(fs.existsSync(localPath) ? localPath : globalPath, 'utf8');
  return SCF(JSON.parse(config));
};
