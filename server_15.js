const express = require('express');
const static = require('express-static');
const cookieParser = require('cookie-parser');
const cookieSession = require('cookie-session');
const bodyParser = require('body-parser'); //缺点, 解析不了文件上传
const multer = require('multer'); // 解析post表单上传的文件
const fs = require('fs');
const pathLib = require('path');
const ejs = require('ejs');
const jade = require('jade');
const consolidate = require('consolidate');

const objMulter = multer({
    dest: './www/upload', //dest为上传的文件存放地址
});
const server = express();


server.listen(8080);

// 1. 解析cookie
server.use(cookieParser('eiofjwiogjoierjoigyjtryjtr4we4f89w4er'));

// 2.使用session
let arr = [];
for(let i = 0; i < 1000; i++) {
    arr.push('keys_' + Math.random());
}
server.use(cookieSession({
    name: 'name_xmj_id',
    keys: arr,
    maxAge: 20 * 3600 * 1000 //有效时间为20分钟
}));

// 3. post数据
// server.use(bodyParser.urlencoded({extended: false}));
server.use(objMulter.any()); //any 可以接收如何文件  有风险!

// 4.适配模板引擎
// 输出什么东西
server.set('view engine', 'html');

// 模板文件在哪里
server.set('views', './views');

// 使用哪种模板引擎  ejs
server.engine('html', consolidate.ejs);

server.get('/index', (req, res) => {
    res.render('2.ejs', {
        name: 'xmj',
    })
});

// //用户请求
// server.use('/', (req, res, next) => {
//     // get数据
//     console.log('req.query:', req.query);
//     // post数据
//     // console.log('req.body:', req.body);
//     console.log('req.cookies:', req.cookies);
//     console.log('req.session:', req.session);
// })

server.post('/form', (req, res)=>{
    console.log('req.files:', req.files);

    // 改名字

    // req.files: [ { fieldname: 'f1',
    // originalname: '12.jpg',
    // encoding: '7bit',
    // mimetype: 'image/jpeg',
    // destination: './www/upload',
    // filename: '4d5bf64e6b3aa80b46622148931420db',
    // path: 'www\\upload\\4d5bf64e6b3aa80b46622148931420db',
    // size: 27061 } ]

    // 'www\\upload\\4d5bf64e6b3aa80b46622148931420db'  + '.jpg'
    const newName = 
    req.files[0]['path'] + pathLib.parse(req.files[0]['originalname']).ext;

    console.log('+++++++++++++++++newName:', newName);

    fs.rename(req.files[0]['path'], newName, (err) => {
        if(err) {
            res.send('上传文件失败');
        }else {
            res.send('上传文件成功');
        }
    })
})

// 4.static数据
server.use(static('./www'));

// 运行 node server_15.js
// 打开网页  http://localhost:8080/?a=79&b=xmj
// 打开网页  http://localhost:8080/index