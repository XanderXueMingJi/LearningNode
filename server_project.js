const express = require('express');
const static = require('express-static');
const cookieParser = require('cookie-parser');
const cookieSession = require('cookie-session');
const bodyParser = require('body-parser');
const multer = require('multer');
const consolidate = require('consolidate');
const mysql = require('mysql');

const common = require('./libs/common');

//连接池
const db = mysql.createPool({ host: 'localhost', user: 'root', password: '123456', database: 'blog' });

var server = express();
server.listen(8080);

//1.解析cookie
server.use(cookieParser('sdfasl43kjoifguokn4lkhoifo4k3'));

//2.使用session
var arr = [];
for (var i = 0; i < 100; i++) {
  arr.push('keys_' + Math.random());
}
server.use(cookieSession({ name: 'zns_sess_id', keys: arr, maxAge: 20 * 3600 * 1000 }));

//3.post数据
server.use(bodyParser.urlencoded({ extended: false }));
server.use(multer({ dest: './www_project/upload' }).any());

//4.配置模板引擎
//输出什么东西
server.set('view engine', 'html');
//模板文件放在哪儿
server.set('views', './template');
//哪种模板引擎
server.engine('html', consolidate.ejs);

//接收用户请求
server.get('/', (req, res, next) => {
  //查询banner的东西
  db.query("SELECT * FROM banner_table", (err, data) => {
    if (err) {
      console.log('1查询新闻列表:', err);
      res.status(500).send('database error').end();
    } else {
      // res.render('index.ejs', {banners: data});
      res.banners = data;
      next();
    }
  });
});
server.get('/', (req, res, next) => {
  //查询新闻列表
  db.query("SELECT `ID`, `title`, `summery` FROM article_table;", (err, data) => {
    if (err) {
      console.log('2查询新闻列表:', err);
      res.status(500).send('database error').end();
    } else {
      // console.log('++++++++++++++++++++++++++', data);
      res.news = data;
      next();
      // res.render('index.ejs', {
      //   banners: res.banners, 
      //   articles: data,
      // });
    }
  });
});

server.get('/', (req, res) => {

  res.render('index.ejs', {
    banners: res.banners,
    news: res.news,
  })
})

server.get('/article', (req, res) => {
  const id = req.query.id;
  const act = req.query.act;
  console.log('id:', id);
  if (id) {
    //查询新闻列表
    if(act === 'zan') {
      // 增加一个赞
      db.query("UPDATE article_table SET n_like = n_like + 1 WHERE  `ID` = " + id, (err, data) => {
        if (err) {
          console.log(err);
          res.status(500).send('database error').end();
        } else {
          db.query("SELECT * FROM article_table WHERE `ID` = " + id, (err, data) => {
            if (err) {
              console.log(err);
              res.status(500).send('database error').end();
            } else {
              // console.log('++++++++++++++++++++++++++ article:', data);
              // res.article = data;
      
              res.render('conText.ejs', {
                conText: data[0],
                time: common.timeDate(data[0]['post_time']),
                content: data[0]['content'].replace(/^/gm, '<p>').replace(/$/gm, '</p>'),
              })
            }
          });
        }
      });
    }else {
      db.query("SELECT * FROM article_table WHERE `ID` = " + id, (err, data) => {
        if (err) {
          console.log(err);
          res.status(500).send('database error').end();
        } else {
          // console.log('++++++++++++++++++++++++++ article:', data);
          // res.article = data;
  
          res.render('conText.ejs', {
            conText: data[0],
            time: common.timeDate(data[0]['post_time']),
            content: data[0]['content'].replace(/^/gm, '<p>').replace(/$/gm, '</p>'),
          })
        }
      });

    }

  } else {
    res.status(404).send('没有对应的文章id, 查找失败!');
  }
});



//4.static数据
server.use(static('./www_project'));


// node server_project.js
// http://localhost:8080
// http://localhost:8080/index.html
// http://localhost:8080/conText.html