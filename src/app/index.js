const Koa = require('koa');
const cors = require('@koa/cors');
const bodyParser = require('koa-bodyparser');

const registerRouters = require('../router');

// 1.创建app
const app = new Koa();

app.use(
  cors({
    origin: '*', // 指定前端域名
    allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // 必须包含 OPTIONS
    allowHeaders: ['Content-Type', 'Authorization'],
    credentials: true // 允许携带凭证
  })
);

// 2.对app使用中间件
app.use(bodyParser());
registerRouters(app);

// 3.将app导出
module.exports = app;
