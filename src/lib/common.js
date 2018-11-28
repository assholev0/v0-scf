const chalk = require('chalk');

exports.handler = (action = '') => ({
  Response: {
    Error: {
      Message = ''
    } = {}
  }
} = {}) => {
  if (Message === '') {
    // eslint-disable-next-line no-console
    console.log(chalk`{green.bold ${action}成功!}`);
  } else {
    // eslint-disable-next-line no-console
    console.log(chalk`{red.bold ${action}失败:} ${Message}`);
  }
  return Message === '';
};
