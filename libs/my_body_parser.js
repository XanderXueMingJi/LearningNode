const querystring = require('querystring');

module.exports = function(req, res, next) {
    var str = '';
    req.on('data', function(data) {
        console.log('data:', data);
        str += data;
    })

    req.on('end', () => {
        // req.body = str;
        req.body = querystring.parse(str);
        next();
    })
}