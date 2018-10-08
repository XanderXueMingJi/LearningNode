
const crypto = require('crypto');


function toDou(n) {
    return n < 10? '0' + n: n;
}

module.exports = {
    timeDate: function(times) {
        var date = new Date();
        date.setTime(times * 1000);
        return date.getFullYear() + '-' 
        + toDou(date.getMonth() + 1) + '-' 
        + toDou(date.getDate()) + ' ' 
        + toDou(date.getHours()) + ':' 
        + toDou(date.getMinutes()) + ':' 
        + toDou(date.getSeconds());
    },
    MD5_SUFFIX: 'FIWEHIOjoerigjFJ54IO67oi;YJIOUJ7gre6IPOJ94U//R*43',
    md5: function(str) {
        const obj = crypto.createHash('md5');

        obj.update(str);

        return obj.digest('hex'); // hex: 以16进制显示

    },
}