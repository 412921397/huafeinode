const categoryService = require('../service/category.service');

class CategoryController {
  async create(ctx, next) {
    // 1.获取用户传递过来信息
    const data = ctx.request.body;

    // 2.将user信息存储到数据库中
    const result = await categoryService.create(data);

    // 3.查看存储的结果, 告知前端创建成功
    ctx.body = {
      code: 1,
      message: '创建商品成功~',
      data: result
    };
  }

  async list(ctx, next) {
    // 1.获取用户传递过来信息
    const data = ctx.query;
    console.log(data, 'data数据');
    const page = Number(data.offset) || 1; // 默认值为 0
    const pageSize = Number(data.pageSize) || 10; // 默认值为 10
    const params = { ...data, page, pageSize };

    // 2.将data信息存储到数据库中
    const result = await categoryService.list(params);

    // 3.查看存储的结果, 告知前端查询成功
    ctx.body = {
      code: 1,
      message: '查询商品成功~',
      data: result
    };
  }

  async update(ctx, next) {
    const { id } = ctx.params;
    const { name, commodityDesc, brand, createT, picture, updateT } = ctx.request.body;
    const data = { id, name, commodityDesc, brand, createT, picture, updateT };
    await categoryService.update(data);
    ctx.body = {
      code: 1,
      message: '更新商品成功~'
    };
  }

  async remove(ctx, next) {
    const { id } = ctx.params;
    await categoryService.remove(id);
    ctx.body = {
      code: 1,
      message: '删除商品成功~'
    };
  }

  async queryBrand(ctx, next) {
    const result = await categoryService.queryBrand();
    ctx.body = {
      code: 1,
      data: result,
      message: '成功~'
    };
  }
}

module.exports = new CategoryController();
