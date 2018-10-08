const express = require('express');

const server = express();

// 目录1: /user/
const routerUser = express.Router();

routerUser.get('/1.html', (req, res) => { //http://localhost:8080/user/1.html
    res.send('open user1');
})
routerUser.get('/2.html', (req, res) => { //http://localhost:8080/user/2.html
    res.send('open user2');
})

server.use('/user', routerUser);

// 目录2: /article/
const articleRouter = express.Router();

articleRouter.get('/41118.html', (req, res) => {//http://localhost:8080/article/41118.html
    res.send('fijweoijg3ior5j4otij54t');
})


server.use('/article', articleRouter);



server.listen(8080);

// node server_router.js