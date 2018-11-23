const chalk = require('chalk');
const { version } = require('../package.json');

module.exports = () => {
  // eslint-disable-next-line no-console
  console.log(chalk`{magenta.bold scf v${version}}
  scf {bold [操作]} {bold [云函数名]}

  操作列表：
    - {blue.bold login} 不用传入云函数名称，根据提示进行登录
    - {blue.bold create} 创建云函数
    - {blue.bold delete} 删除云函数
    - {blue.bold update} 更新云函数代码
    - {blue.bold list} 获取远程云函数列表
    - {blue.bold invoke} {italic.underline 暂不支持}
    - {blue.bold help} 帮助

  函数名称规则： {yellow.bold 最长60个字符，字母开头，支持 a-z，A-Z，0-9，-，_，且需要以数字或字母结尾}
`);
};
