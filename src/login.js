const inquirer = require('inquirer');
const chalk = require('chalk');
const { SCF } = require('wqcloud');
const fs = require('fs');
const { globalPath, localPath } = require('./config');

const regions = [
  '广州-华南地区(ap-guangzhou)',
  '上海-华东地区(ap-shanghai)',
  '北京-华北地区(ap-beijing)',
  '成都-西南地区(ap-chengdu)',
  new inquirer.Separator(),
  '香港(ap-hongkong)',
  new inquirer.Separator(),
  '广州Open-华南地区(ap-guangzhou-open)',
  '孟买-亚太地区(ap-mumbai)',
  new inquirer.Separator()
];

module.exports = async () => {
  if (fs.existsSync(localPath) || fs.existsSync(globalPath)) {
    // 已经登录
    const { confirm = false } = await inquirer.prompt([
      {
        type: 'confirm',
        name: 'confirm',
        message: '已经登录过了，是否需要重新登录',
        default: false
      }
    ]);
    if (!confirm) {
      return;
    }
  }
  // 登录
  const answers = await inquirer.prompt([
    {
      type: 'input',
      name: 'SecretId',
      message: 'SecretId',
      validate: v => (v ? true : '必填项')
    },
    {
      type: 'password',
      mask: '*',
      name: 'SecretKey',
      message: 'SecretKey',
      validate: v => (v ? true : '必填项')
    },
    {
      type: 'list',
      name: 'Region',
      message: '地区',
      choices: regions
    },
    {
      type: 'confirm',
      name: 'Global',
      message: '全局登录',
      default: false
    }
  ]);
  const { SecretId, SecretKey, Global } = answers;
  const [, Region = 'ap-guangzhou'] = answers.Region.match(/\(([\S]+)\)/) || [];
  const rcData = {
    SecretId, SecretKey, Region
  };
  const sdk = SCF(rcData);
  const { codeDesc = '' } = await sdk.ListFunctions();
  if (codeDesc !== 'Success') {
    // eslint-disable-next-line no-console
    console.log(chalk`SecretId/SecretKey {red.bold 校验失败}，请检查后重新尝试。`);
    return;
  }

  fs.writeFileSync(Global ? globalPath : localPath, `${JSON.stringify(rcData, null, 2)}\n`, 'utf8');
  if (!Global) {
    const ignorePath = './.gitignore';
    const filename = localPath.replace('./', '');
    let ignoreFileString = '';
    try {
      ignoreFileString = fs.readFileSync(ignorePath, 'utf8');
    } catch (e) {
      // eslint-disable-line no-empty
    }
    if (ignoreFileString.indexOf(filename) < 0) {
      ignoreFileString += `\n\n${filename}\n`;
      fs.writeFileSync(ignorePath, ignoreFileString, 'utf8');
    }
  }
  // eslint-disable-next-line no-console
  console.log(chalk`{green.bold 配置已经保存。}`);
};
