const KoaRouter = require('@koa/router');

const { create, list, update, remove, showAvatarImage } = require('../controller/categoryinfo.controller');
// 1.创建路由对象
const categoryInfoRouter = new KoaRouter({ prefix: '/category/info' });

// 2.定义路由中映射
// 2.1.创建商品接口
categoryInfoRouter.post('/create', create);
// 2.2.获取商品接口
categoryInfoRouter.get('/list', list);
// 2.3.修改数据
categoryInfoRouter.patch('/:id', update);
// 2.4.删除数据
categoryInfoRouter.delete('/:id', remove);
// 2.5.为用户提供头像
categoryInfoRouter.get('/avatar/:id', showAvatarImage);

// 3.导出路由
module.exports = categoryInfoRouter;
