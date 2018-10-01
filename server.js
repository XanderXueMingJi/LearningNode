// 运行npm init  使用 插件包   
 
// npm 浏览器调试:
// npm install --save koa koa-route

const Koa = require('koa');
const app = new Koa();
const http = require('http'); // 引用模块
const fs = require('fs');
const urlLib = require('url');  
const querystring = require('querystring');

// req: request 请求   用户输入的东西
// res: response 响应  输出给浏览器的东西

// http://localhost:8080/2.html 请求文件
var server = http.createServer((req, res) => {

    // req.on('data'   实现post数据发送(分段) 可以发生很多次
    var str = ''; // 接收post数据用到

    var i = 0;
    req.on('data', (data) => {
        console.log(`第${i ++}次获取数据`)
        str += data;
    })

    // req.on('end'  实现post数据发送 数据全部到达(一次)
    req.on('end', () => {
        // console.log('str:', str);
        const POST = querystring.parse(str); // post请求的参数部分 {..: .., ...: ...}
        console.log('POST:', POST);
    })

    // req: 接收前台传过来的数据
    const url = req.url;
    if(url.indexOf('?') != -1) {
        const obj = urlLib.parse(url, true);
        // console.log('obj:', obj);
        const GET = obj.query; // get请求的参数部分 {..: ..}
        const url_path_name = obj.pathname;
        console.log('++++++++++url_path_name:', url_path_name);
        const file_name = './www' + url_path_name;

        fs.readFile(file_name, (err, data) => {
            if(err) {
                res.write('404');
            }else {
                res.write(data);
            }
    
            // 结束请求
            res.end();
        });
    }
});

// 监听: 等着
server.listen(8080); // 8080是端口 类似房子的门牌号

app.listen(3001);
// 运行 node server.js    打开浏览器 http://localhost:8000/
// 或者 node --inspect-brk=9229 server.js     开发者模式 打开浏览器 http://127.0.0.1:3001    
// 

