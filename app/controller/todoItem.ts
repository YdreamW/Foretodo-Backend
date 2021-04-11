import { Context, Controller } from 'egg';

export default class TodoItemController extends Controller {

  public async GetOneTodoItem(ctx: Context) {
    const todoItemId = ctx.params._id;
    ctx.body = await ctx.model.TodoItem.findById(
      todoItemId,
    ).populate('user', 'package', 'type');
  }

  public async GetManyTodoItem(ctx: Context) {
    ctx.body = await ctx.model.TodoItem.find();
  }

  public async InsertTodoItem(ctx: Context) {
    ctx.body = 'API not available.';
  }

  public async UpdateTodoItem(ctx: Context) {
    ctx.body = 'API not available.';
  }

  public async DeleteTodoItem(ctx: Context) {
    ctx.body = 'API not available.';
  }
}
