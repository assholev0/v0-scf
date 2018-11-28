const inquirer = require('inquirer');
const fse = require('fs-extra');
const path = require('path');
const SDK = require('./lib/sdk');
const pack = require('./lib/pack');
const { handler } = require('./lib/common');
const { input, envEditor } = require('./lib/prompt');

module.exports = async (fn = '') => {
  const FunctionName = fn || await input();
  const prompts = await inquirer.prompt([
    {
      type: 'input',
      name: 'MemorySize',
      message: '函数运行时内存大小, 以 128MB 为阶梯',
      default: 128,
      validate: v => ((~~v >= 128 && ~~v <= 1536 && ~~v % 128 === 0) ? true : '可选范围 128MB-1536MB，并且以 128MB 为阶梯')
    },
    {
      type: 'input',
      name: 'Timeout',
      message: '函数最长执行时间, 单位为秒',
      default: 3,
      validate: v => ((~~v >= 1 && ~~v <= 300) ? true : '可选值范围 1-300 秒')
    }
  ]);
  const env = await envEditor();

  const zip = await pack();

  const sdk = SDK();
  const result = await sdk.CreateFunction({
    FunctionName,
    'Code.ZipFile': zip,
    Handler: 'index.main_handler',
    ...prompts,
    ...env,
    Runtime: 'Nodejs8.9'
  }).then(handler('创建'));
  if (result) {
    fse.copySync(path.join(__dirname, '../template'), `./${FunctionName}`);
  }
};
