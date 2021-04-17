import { Context, Controller } from 'egg';

export default class TodoPackageController extends Controller {
  public async GetOneTodoPackage(ctx: Context) {
    const todoPackageId = ctx.params._id;
    ctx.body = await ctx.model.TodoPackage.findById(todoPackageId).populate(
      'user'
    );
  }

  public async GetManyTodoPackage(ctx: Context) {
    const {
      user: { _id },
    } = ctx.state;
    const todoPackages = await ctx.model.TodoPackage.find({ user: _id });
    ctx.body = {
      code: 0,
      msg: 'success',
      data: { todoPackages },
    };
  }

  public async InsertTodoPackage(ctx: Context) {
    ctx.body = 'API not available.';
  }

  public async UpdateTodoPackage(ctx: Context) {
    ctx.body = 'API not available.';
  }

  public async DeleteTodoPackage(ctx: Context) {
    ctx.body = 'API not available.';
  }
}
