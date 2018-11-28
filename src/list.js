const chalk = require('chalk');
const SDK = require('./lib/sdk');

module.exports = async () => {
  const sdk = SDK();
  let allTotal = 1;
  const getted = [];
  while (getted.length < allTotal) {
    const {
      Response: {
        Functions = [],
        TotalCount = 0
      }
      // eslint-disable-next-line no-await-in-loop
    } = await sdk.ListFunctions({
      Limit: 100,
      Offset: getted.length
    });
    allTotal = TotalCount;
    getted.push(...Functions);
  }
  // eslint-disable-next-line no-console
  getted.forEach(({ FunctionName, AddTime, ModTime }) => console.log(chalk`{magenta.bold ${FunctionName}} (修改时间: ${ModTime} | 添加时间：${AddTime})`));
};
