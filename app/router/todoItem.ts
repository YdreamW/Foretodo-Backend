import { Application } from 'egg';

export default (app: Application) => {
  const { controller, router } = app;
  const { checkItemExist, jwtAuth } = app.middleware;

  router.get(
    '/todo-item/:_id',
    checkItemExist('TodoItem'),
    jwtAuth(),
    controller.todoItem.GetOneTodoItem,
  );

  router.get(
    '/todo-item',
    jwtAuth(),
    controller.todoItem.GetManyTodoItem,
  );

  router.post(
    '/todo-item/:_id',
    checkItemExist('TodoItem'),
    jwtAuth(),
    jwtAuth(),
    controller.todoItem.UpdateTodoItem,
  );

  router.post(
    '/todo-item',
    jwtAuth(),
    controller.todoItem.InsertTodoItem,
  );

  router.delete(
    '/todo-item/:_id',
    checkItemExist('TodoItem'),
    jwtAuth(),
    controller.todoItem.DeleteTodoItem,
  );

};
