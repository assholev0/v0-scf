const chalk = require('chalk');
const SDK = require('./lib/sdk');

module.exports = async () => {
  const sdk = SDK();
  let allTotal = 1;
  const getted = [];
  while (getted.length < allTotal) {
    const {
      data: {
        functions,
        total = 0
      }
      // eslint-disable-next-line no-await-in-loop
    } = await sdk.ListFunctions({
      Limit: 100,
      Offset: getted.length
    });
    allTotal = total;
    getted.push(...functions);
  }
  // eslint-disable-next-line no-console
  getted.forEach(({ functionName, addTime, modTime }) => console.log(chalk`{magenta.bold ${functionName}} (修改时间: ${modTime} | 添加时间：${addTime})`));
};
