// 运行npm init  使用 插件包   
 
// npm 浏览器调试:
// npm install --save koa koa-route

const Koa = require('koa');
const app = new Koa();

const http = require('http'); // 引用模块


// req: request 请求   用户输入的东西
// res: response 响应  输出给浏览器的东西
var server = http.createServer((req, res) => {
    console.log('req.url', req.url);
    // // 发送东西
    // res.write('abc');

    switch(req.url) {
        case '/1.html':
            res.write('abc');
            break;
        case '/2.html':
            res.write('def');
            break;
        default:
            res.write('404');
            break;
    }

    // 结束请求
    res.end();
});

// 监听: 等着
server.listen(8080); // 8080是端口 类似房子的门牌号




app.listen(3001);
// 运行 node server.js    打开浏览器 http://localhost:8000/
// 或者 node --inspect-brk=9229 server.js     开发者模式 打开浏览器 http://127.0.0.1:3001    
// 
