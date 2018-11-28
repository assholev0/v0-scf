const SDK = require('./lib/sdk');
const pack = require('./lib/pack');
const { select } = require('./lib/prompt');
const { handler } = require('./lib/common');

module.exports = async (fn = '') => {
  const FunctionName = fn || await select();

  const zip = await pack(FunctionName);
  const sdk = SDK();
  await sdk.UpdateFunctionCode({
    FunctionName,
    Handler: 'index.main_handler',
    ZipFile: zip
  }).then(handler('上传'));
};
