const ejs = require('ejs');

ejs.renderFile('./views/1.ejs', {
    name: 'xmj', //传给模板的参数
    json: {
        arr: [
            {user: 'blue', pass: '123456'},
            {user: 'xmj', pass: '789123'},
            {user: 'king', pass: '456789'},
        ]
    }
}, (err, data) => {
    if (err) {
        console.log('编译失败');
    } else {
        console.log('data:', data);
    }
});

// 运行 node server_ejs.js
