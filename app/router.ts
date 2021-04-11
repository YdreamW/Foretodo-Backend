import { Application } from 'egg';

export default (app: Application) => {
  const { controller, router } = app;

  // HeathCheck 用于自动化监控服务状态，应总是回传 200 OK
  router.get('/', controller.root.HealthCheck);

  if (process.env.NODE_ENV !== 'production') {
    // 获取测试 Token (开发用)
    // 便于 Postman 调用带 JWT 认证的 Auth 接口
    router.get('/test-token', controller.root.GetTestToken);
  }
};
