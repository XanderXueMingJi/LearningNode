const fs = require('fs');



//读文件:  readFile(文件名, 回调函数) fs.readFile是异步函数
fs.readFile('aaa.txt', (err, data) => {
    if(err) {
        console.log('err:', err)
    }else {
        console.log('data:', data.toString() )
    }
})

//写文件   fs.writeFile(文件名, 内容, 回调函数)
fs.writeFile('aaa.txt', 'user', (err) => {
    console.log('err:', err)
})





// 运行 node fs.js
