const commont = require('./libs/common').md5;
const MD5_SUFFIX = require('./libs/common').MD5_SUFFIX;

console.log('md5:', commont('123456' + MD5_SUFFIX));

// node md5_show.js