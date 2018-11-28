const fs = require('fs-extra');
const chalk = require('chalk');
const { select } = require('./lib/prompt');
const SDK = require('./lib/sdk');

module.exports = async (fn = '') => {
  const FunctionName = fn || await select();
  const sdk = SDK();
  const {
    Response: {
      Error: {
        Message = ''
      } = {}
    }
  } = await sdk.DeleteFunction({
    FunctionName
  });
  if (Message === '') {
    // eslint-disable-next-line no-console
    console.log(chalk`{green.bold 删除成功!}`);
  } else {
    // eslint-disable-next-line no-console
    console.log(chalk`{red.bold 删除失败:} ${Message}`);
  }
  fs.removeSync(fn);
};
