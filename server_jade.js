const jade = require('jade');
const fs = require('fs');

// var str = jade.render('html');
var str = jade.renderFile('./views/1.jade', {
    pretty: true, //美化输出的html, 可以不写
});

console.log('str:', str);

//创建html
fs.writeFile('./build/save_jade.html', str, (err)=> {
    if(err) {
        console.log('写入失败:', err);
    }else {
        console.log('写入成功');
    }
})

// 运行 node server_jade.js