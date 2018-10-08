const express = require('express');
const static = require('express-static');
const mysql = require('mysql');
const multer = require('multer'); // 处理文件上传
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cookieSession = require('cookie-session');
const consolidate = require('consolidate');
// const expressRouter = require('express-router');


const multerObj = multer({ // 上传文件放哪里
    dest: './static/upload',
})
const server = express();




server.listen(8080);


// 1.获取请求数据
server.use(bodyParser.urlencoded()); // 对get请求的数据解析
server.use(multerObj.any());// multerObj.any: 不对上传的文件做限制

const keys = [];
for(let i = 0; i < 100; i++) {
    keys[i] = Math.random();
}

// 2.cookie, session
server.use(cookieParser());
server.use(cookieSession({
    name: 'sess_id',
    keys,
    maxAge: 20*60*1000 // 20分钟
}));

// 3.模板
server.engine('html', consolidate.ejs);
server.set('views', 'template_bk02');
server.set('views engine', 'html');

// 4.route
// const r1 = express.Router();
server.use('/', require('./route/web')());
server.use('/admin', require('./route/admin')());

// 5. default: static ？？？ 静态文件从哪里拿？？？
server.use(static('./static/'));













// node server_project_bk02.js

// http://localhost:8080
// http://localhost:8080/admin

























