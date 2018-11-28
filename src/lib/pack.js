const fs = require('fs');
const path = require('path');
const archiver = require('archiver');

const getDefer = () => {
  const deferred = {};
  deferred.promise = new Promise((resolve, reject) => {
    deferred.resolve = resolve;
    deferred.reject = reject;
  });
  return deferred;
};

module.exports = (fn = 'template') => {
  const deferred = getDefer();
  const filepath = path.join(__dirname, `../../temp/${fn}.zip`);
  const output = fs.createWriteStream(filepath);
  const archive = archiver('zip', {
    zlib: { level: 9 }
  });
  archive.on('warning', (err) => {
    if (err.code === 'ENOENT') {
      // log warning
    } else {
      deferred.reject(err);
    }
  });
  archive.on('error', (err) => {
    deferred.reject(err);
  });
  archive.pipe(output);
  archive.directory(fn === 'template' ? path.join(__dirname, '../../template/') : `./${fn}`, false);
  archive.finalize();
  output.on('close', () => {
    deferred.resolve(
      fs.readFileSync(filepath, 'base64')
    );
  });
  return deferred.promise;
};
