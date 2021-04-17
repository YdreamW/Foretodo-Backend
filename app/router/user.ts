import { Application } from 'egg';

/**
 * 用户路由
 */

export default (app: Application) => {
  const { controller, router } = app;
  const { checkItemExist, jwtAuth } = app.middleware;

  // 微信登录
  router.post('/user/login/wechat', controller.user.WechatLogin);

  // 获取用户资料
  router.get('/user/info', jwtAuth(), controller.user.getUserInfo);

  // 获取用户资料
  router.get(
    '/user/:id',
    checkItemExist('User'),
    jwtAuth(),
    controller.user.getUserInfo
  );

  router.post(
    '/user/:id/info/register',
    checkItemExist('User'),
    jwtAuth(),
    controller.user.updateRegisterUserInfo
  );

  // 更新用户资料
  router.post(
    '/user/:id/info',
    checkItemExist('User'),
    jwtAuth(),
    controller.user.updateUserInfo
  );
};
