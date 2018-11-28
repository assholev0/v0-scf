const inquirer = require('inquirer');
const login = require('./login');
const create = require('./create');
const deleter = require('./delete');
const update = require('./update');
const list = require('./list');
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
  'help 帮助', // 8
  new inquirer.Separator()
];

module.exports = async () => {
  const { cmd = 'help' } = await inquirer.prompt([
    {
      type: 'list',
      name: 'cmd',
      pageSize: 10,
      message: '你想要做些什么？',
      choices
    }
  ]);
  switch (choices.findIndex(x => x === cmd)) {
    case 0: {
      login();
      break;
    }
    case 2: {
      create();
      break;
    }
    case 3: {
      deleter();
      break;
    }
    case 4: {
      update();
      break;
    }
    case 5: {
      list();
      break;
    }
    default: {
      help();
    }
  }
};
