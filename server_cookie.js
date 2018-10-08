const express = require('express');
const cookieParser = require('cookie-parser'); // 回去浏览器的cookie
const cookieSession = require('cookie-session');
const server = express();

// 对象session进行加密, 是密钥, 数组内的字符串可以有很多个
const keys = ['aaa', 'bbb', 'ccc'];

// 读取cookie,  session也会用到
server.use(cookieParser('ew5f1e5w1g5er61ghtrh')); // ew5f1e5w1g5er61ghtrh为签名字符串

server.use(cookieSession({
    name: 'sess',
    keys,
    maxAge:  2 * 3600 * 1000, //session的有效期为2小时
}));

server.use('/aaa/b.html', (req, res) => {
    // //删除cookie   参数:名字 没实现删除效果!!!!!!
    // res.clearCookie('user');
    if(req.session['count']) {
        req.session['count']++;
    }else {
        req.session['count'] = 1;
    }


    console.log("req.session['count']:", req.session['count']);

    //cookie加密
    req.secret='ew5f1e5w1g5er61ghtrh'; //秘钥

    // 创建cookie 参数 名字, 值, {设置}
    res.cookie('user002', 'xmj', {
        path: '/aaa', // 在路径页面下才有cookie
        maxAge: 30*24*3600*1000,
        signed: true, //签名, 和上面的req.secret有紧密的联系
    } );

    // 没签过名的cookie 
    console.log('req.cookies:', req.cookies);

    // 签过名的cookie
    console.log('req.signedCookies:', req.signedCookies);


    res.send('xmj2');
});

server.listen(8080);

// 运行 node server_cookie.js
// 打开网页 http://127.0.0.1:8080/