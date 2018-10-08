const mysql = require('mysql');

// 1.连接
// mysql.createConnection(哪台服务器, 用户名, 密码, 库)
const db = mysql.createConnection({
    host: 'localhost', //主机
    port: 3306, //端口 如果是3306就可以不写
    user: 'root', //
    password: '123456',
    database: '1005', //使用的是哪个库?
});

// console.log('db:', db);

// 2.查询
//query(干啥, 回调)
db.query('SELECT * FROM `user_table`;', (err, data)=>{
    if(err) {
        console.log('err:', err);
    } else {
        console.log('success:', data);
        console.log('ssssssssssssssssss');
        console.log('json:', JSON.stringify(data));
    }
})

// node server_mysql.js