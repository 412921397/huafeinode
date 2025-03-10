const KoaRouter = require('@koa/router');
const { create } = require('../controller/file.controller');
const { handleAvatar } = require('../middleware/file.middleware');

const fileRouter = new KoaRouter({ prefix: '/file' });

// file/avatar => 上传头像
fileRouter.post('/avatar', handleAvatar, create);

module.exports = fileRouter;
