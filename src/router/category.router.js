const KoaRouter = require('@koa/router');

const { create, list, update, remove, queryBrand } = require('../controller/category.controller');
// 1.创建路由对象
const categoryRouter = new KoaRouter({ prefix: '/category/type' });

// 2.定义路由中映射
// 2.1.创建商品接口
categoryRouter.post('/create', create);
// 2.2.获取商品接口
categoryRouter.get('/list', list);
// 2.3.修改数据
categoryRouter.patch('/:id', update);
// 2.4.删除数据
categoryRouter.delete('/:id', remove);
// 2.5.查询品牌
categoryRouter.get('/brand', queryBrand);

// 3.导出路由
module.exports = categoryRouter;
