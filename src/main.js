const inquirer = require('inquirer');
const login = require('./login');
const help = require('./help');

const choices = [
  'login 登录', // 0
  new inquirer.Separator(),
  'create 创建云函数', // 2
  'delete 删除云函数', // 3
  'update 更新云函数代码', // 4
  'list 获取远程云函数列表', // 5
  {
    name: 'invoke 执行云函数',
    disabled: '暂不支持'
  },
  new inquirer.Separator(),
  'help 帮助'// 8
];

module.exports = async (_, args) => {
  const { cmd = 'help' } = await inquirer.prompt([
    {
      type: 'list',
      name: 'cmd',
      message: '你想要做些什么？',
      choices
    }
  ]);
  switch (choices.findIndex(x => x === cmd)) {
    case 0: {
      login('', args);
      break;
    }
    default: {
      help();
    }
  }
};
