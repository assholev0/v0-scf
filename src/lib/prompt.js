const inquirer = require('inquirer');
const fs = require('fs');

exports.select = () => {
  const files = fs.readdirSync('.', { withFileTypes: true });
  const dirs = files.filter(x => x.isDirectory() && !x.name.startsWith('.') && x.name !== 'node_modules').map(x => x.name);
  return inquirer.prompt([{
    type: 'list',
    name: 'result',
    message: '选择本地云函数',
    choices: dirs
  }]).then(({ result }) => result);
};

exports.input = () => inquirer.prompt([{
  type: 'input',
  name: 'result',
  message: '输入云函数名称',
  validate: v => (/^[a-zA-Z][\w-]{0,58}[a-zA-Z0-9]$/.test(v) ? true : '函数名称支持26个英文字母大小写、数字、连接符和下划线，第一个字符只能以字母开头，最后一个字符不能为连接符或者下划线，名称长度2-60')
}]).then(({ result }) => result);

exports.envEditor = () => inquirer.prompt([
  {
    type: 'confirm',
    name: 'confirm',
    message: '是否要设置环境变量？',
    default: false
  },
  {
    type: 'editor',
    name: 'env',
    message: '环境变量，请每行输入一个，参考格式`NODE_ENV=produection`',
    defaut: '',
    when: answers => answers.confirm
  }
]).then(({ env = '' }) => {
  const envArr = env.split(/\s*\n\s*/).reduce((r, i) => {
    const [, key = '', val = ''] = i.match(/(\w+)\s*=\s*(\S+)/) || [];
    if (key !== '') {
      r.push([key, val]);
    }
    return r;
  }, []);
  const obj = {};
  envArr.forEach(([key, val], i) => {
    obj[`Environment.Variables.${i}.Key`] = key;
    if (val !== '') {
      obj[`Environment.Variables.${i}.Value`] = val;
    }
  });
  return obj;
});
