const express = require('express');
const mysql = require('mysql');


const commont = require('./../libs/common').md5;
const MD5_SUFFIX = require('./../libs/common').MD5_SUFFIX;

// console.log('md5:', commont('123456' + MD5_SUFFIX));

const db = mysql.createConnection({
    host: 'localhost', //主机
    port: 3306, //端口 如果是3306就可以不写
    user: 'root', //
    password: '123456',
    database: 'learn', //使用的是哪个库?
});

module.exports = function() {
    const router = express.Router();
    router.get('/', (req, res) => {
        res.send('我是admin').end();
    })

    // 检查登录状态
    router.use((req, res, next) => {
        // if(req.session['admin_id']) { //有登录
        //     next();
        // }else if(!req.session['admin_id'] && req.url != '/login' ) { // 没登录
        //     // 重定向 到登录
        //     res.redirect('/admin/login');
        // }else {
        //     next();
        // }
        if(!req.session['admin_id'] && req.url != '/login' ) { // 没登录
            // 重定向到登录页面
            res.redirect('/admin/login');
        }else {
            next();
        }
    })


    router.use('/login', (req, res) => {
        console.log('req.body:', req.body);
        const reqBody = req.body;
        const username = reqBody.username;
        const password = reqBody.password;

        db.query('SELECT * FROM `admin_table` WHERE username = ' + username, (err, data) => {
            if(err) {
                console.log('err:', err);
                res.status(500).send('database error').end();
            }else {
                console.log('data:', data);
            }
        })
        res.render('admin/login.ejs', {});
    })

    return router;
}