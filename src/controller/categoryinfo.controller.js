const categoryService = require('../service/categoryinfo.service');
const fileService = require('../service/file.service');

class CategoryinfoController {
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
    const page = Number(data.offset) || 1; // 默认值为 0
    const pageSize = Number(data.pageSize) || 10; // 默认值为 10
    // 检查 status 是否存在并进行转换
    let status;
    if (data.status !== undefined && data.status !== null) {
      status = Number(data.status);
      // 如果 status 转换为 NaN，则设置为 undefined
      if (isNaN(status)) {
        status = undefined;
      }
    } else {
      status = undefined; // 如果没有传递 status，则设置为 undefined
    }
    const params = { ...data, page, pageSize, status };
    console.log(params, 'params');

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
    const { name, newPrice, oldPrice, picture, status, count, nameDesc, weight, categoryType } = ctx.request.body;
    const data = { id, name, newPrice, oldPrice, picture, status, count, nameDesc, weight, categoryType };
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

  async showAvatarImage(ctx, next) {
    // 1.获取用户的id
    const { id } = ctx.params;

    // 2.获取userId对应的头像信息
    const avatarInfo = await fileService.queryAvatarWithUserId(id);
    console.log(avatarInfo, 'avatarInfo');

    // 3.读取头像所在的文件
    const { filename, mimetype } = avatarInfo;
    ctx.type = mimetype;
    ctx.body = fs.createReadStream(`${UPLOAD_PATH}/${filename}`);
  }
}

module.exports = new CategoryinfoController();
