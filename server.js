// 运行npm init  使用 插件包   

// npm 浏览器调试:
// npm install --save koa koa-route
// npm install --save http-assert only parseurl path-is-absolute qs raw-body resolve-path setprototypeof statuses thenify thenify-all vary unpipe type-is path-to-regexp koa-static media-typer methods mime-db mime-types ms mz negotiator on-finished object-assign http-errors iconv-lite inherits is-generator-function keygrip koa koa-body koa-compose koa-convert koa-is-json koa-route koa-send isarray inflation any-promise debug deep-equal delegates depd destroy bytes co co-body content-disposition content-type cookies ee-first error-inject escape-html formidable fresh fs.promised

const Koa = require('koa');
const app = new Koa();
const http = require('http'); // 引用模块
const fs = require('fs');
const urlLib = require('url');
const querystring = require('querystring');

// 用户数据
var users = {}; 

// req: request 请求   用户输入的东西
// res: response 响应  输出给浏览器的东西

// http://localhost:8080/2.html 请求文件
var server = http.createServer((req, res) => {

    // req.on('data'   实现post数据发送(分段) 可以发生很多次
    var str = ''; // 接收post数据用到

    var i = 0;
    req.on('data', (data) => {
        console.log(`第${i++}次获取数据`)
        str += data;
    })

    // req.on('end'  实现post数据发送 数据全部到达(一次)
    req.on('end', () => {
        // console.log('str:', str);
        const POST = querystring.parse(str); // post请求的参数部分 {..: .., ...: ...}
        console.log('POST:', POST);

        const url = req.url;
        const obj = urlLib.parse(url, true);
        // console.log('obj:', obj);
        const GET = obj.query; // get请求的参数部分 {..: ..}
        const url_path_name = obj.pathname;
        console.log('++++++++++url_path_name:', url_path_name);
        const file_name = './www' + url_path_name;
        // 区分接口, 文件
        if (url_path_name === '/user') { //接口 处理用户的注册和登录
            switch (GET.act) {
                case 'reg': //注册
                    //1. 检查用户名是否存在
                    if (users[GET.user]) {
                        res.write('{"OK": false, "msg": "此用户已经存在"}')
                    } else {
                        //2.插入users
                        users[GET.user] = GET.password;
                        res.write('{"OK": true, "msg": "注册成功!"}')
                    }
                    break;
                case 'login': //登录
                    //1. 检查用户是否存在
                    if (users[GET.user] === null) {
                        res.write('{"OK": false, "msg": "此用户不存在"}')
                    } else if (users[GET.user] != GET.password) { //2. 检查用户密码
                        res.write('{"OK": false, "msg": "用户名或者密码有误!"}')
                    } else if (users[GET.user] === GET.password) {
                        res.write('{"OK": true, "msg": "登录成功!"}')
                    }
                    break;
                default:
                    res.write('{"OK": false, "msg": "未知的user接口!"}')
                    break;
            }
            res.end();
        } else {
            fs.readFile(file_name, (err, data) => {
                if (err) {
                    res.write('404');
                } else {
                    res.write(data);
                }
                // 结束请求
                res.end();
            });
        }
    })
});

// 监听: 等着
server.listen(8080); // 8080是端口 类似房子的门牌号

app.listen(3001);
// 运行 node server.js    打开浏览器 http://localhost:8080/
// 或者 node --inspect-brk=9229 server.js     开发者模式 打开浏览器 http://127.0.0.1:3001    
// 

