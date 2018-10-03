// npm install express   支持链式操作
// npm install express-static  // 专门处理静态文件
// npm install ejs  // 
// npm install mysql  // 
// npm install jade  // 
// npm install multer  // 
// npm install consolidate  // 
// npm install body-parser // 中间件 解析post请求用的 (不好用, 后面会弃用)
// npm install express express-static cookie-parser cookie-session

const express = require('express');
const expressStatic = require('express-static');
const querystring = require('querystring');
const bodyParser = require('body-parser');
const My_BodyParser = require('./libs/my_body_parser.js');
// 创建服务
const server = express();

//监听
server.listen(8080);

// 用户数据
var users = {
    xmj: 'king123',
    zhangshang: 'b3b4',
};

// // post数据加工  解析body数据 用了 req.on('data', 就不需要它了
// server.use(bodyParser.urlencoded({
//     extended: true, // 扩展 没什么用
//     limit: 2*1024*1024,  // 限制大小 2M
// }));

server.post('/login', (req, res) => {
    console.log('post req.body:', req.body)
})

// // 处理请求
// server.use('/',(req, res) => {
//     res.send('123456')
//     res.end();
// })

// // 链式操作 next
// server.use('/', (req, res, next) => {
// // server.use((req, res, next) => {
//     console.log('+++++++++++++++++++');
//     var str = '';
//     req.on('data', function(data) {
//         console.log('data:', data);
//         str += data;
//     })

//     req.on('end', () => {
//         // req.body = str;
//         req.body = querystring.parse(str);
//         next();
//     })
// })

server.use(My_BodyParser);

server.use('/', (req, res, next) => {
    console.log('req.body:', req.body);
})

server.get('/login', (req, res) => {
    console.log('req.query:', req.query);
    var userName = req.query['user'];
    var password = req.query['password'];
    if(users[userName]) {
        if(users[userName] === password) {
            res.send({
                OK: true,
                msg: 'good, 登录成功!',
            })
        }else { // 密码错误
            res.send({
                OK: false,
                msg: '密码错误!',
            })
        }

    }else { // 用户不存在
        res.send({
            OK: false,
            msg: '此用户不存在!',
        })
    }
})

// server.use(expressStatic('./www')) // http://localhost:8080/user.html


// 运行   node server_express.js
// 打开网页  http://localhost:8080/