const fs = require('fs-extra');
const chalk = require('chalk');
const select = require('./lib/select');
const SDK = require('./lib/sdk');

module.exports = async (functionName = '') => {
  const fn = functionName || await select();
  const sdk = SDK();
  const { codeDesc = '', message = '' } = await sdk.DeleteFunction({
    functionName: fn
  });
  if (codeDesc === 'Success') {
    // eslint-disable-next-line no-console
    console.log(chalk`{green.bold 删除成功!}`);
  } else {
    // eslint-disable-next-line no-console
    console.log(chalk`{red.bold 删除失败:} ${message}`);
  }
  fs.removeSync(fn);
};
