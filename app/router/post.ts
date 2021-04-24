import { Application } from 'egg';

export default (app: Application) => {
  const { controller, router } = app;
  const { checkItemExist, jwtAuth } = app.middleware;

  router.get(
    '/post/:id',
    checkItemExist('Post'),
    jwtAuth(),
    controller.post.GetOnePost,
  );

  router.get(
    '/post',
    jwtAuth(),
    controller.post.GetManyPost,
  );

  router.post(
    '/add/post',
    jwtAuth(),
    controller.post.InsertPost,
  );

};
