import { Application } from 'egg';

export default (app: Application) => {
  const { controller, router } = app;
  const { checkItemExist, jwtAuth } = app.middleware;

  router.get(
    '/todo-package/:_id',
    checkItemExist('TodoPackage'),
    jwtAuth(),
    controller.todoPackage.GetOneTodoPackage,
  );

  router.get(
    '/todo-package',
    jwtAuth(),
    controller.todoPackage.GetManyTodoPackage,
  );

  router.post(
    '/todo-package/:_id',
    checkItemExist('TodoPackage'),
    jwtAuth(),
    controller.todoPackage.UpdateTodoPackage,
  );

  router.post(
    '/todo-package',
    jwtAuth(),
    controller.todoPackage.InsertTodoPackage,
  );

  router.delete(
    '/todo-package/:_id',
    checkItemExist('TodoPackage'),
    jwtAuth(),
    controller.todoPackage.DeleteTodoPackage,
  );

};
