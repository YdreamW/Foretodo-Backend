import { Application } from 'egg';

export default (app: Application) => {
  const { controller, router } = app;

  // Hello world
  router.get('/', controller.home.test);

  if (process.env.NODE_ENV !== 'production') {
    // 获取测试 Token (开发用)
    // 便于 Postman 调用带 JWT 认证的 Auth 接口
    router.get('/test-token', controller.home.testToken);
  }
};
