import { Context, Controller } from 'egg';

export default class TodoPackageController extends Controller {
  public async GetOneTodoPackage(ctx: Context) {
    const todoPackageId = ctx.params.id;
    const todoPackage = await ctx.model.TodoPackage.findById(
      todoPackageId
    ).populate({
      path: 'items',
      populate: { path: 'type', populate: { path: 'group' } },
    });
    ctx.body = {
      code: 0,
      msg: 'success',
      data: { todoPackage },
    };
  }

  public async GetManyTodoPackage(ctx: Context) {
    const {
      user: { _id },
    } = ctx.state;
    const todoPackages = await ctx.model.TodoPackage.find({
      user: _id,
    }).populate({
      path: 'items',
      select: 'done',
    });
    ctx.body = {
      code: 0,
      msg: 'success',
      data: { todoPackages },
    };
  }

  public async InsertTodoPackage(ctx: Context) {
    const {
      user: { _id },
    } = ctx.state;
    const { items: tmpItems, beginTime, endTime, title } = ctx.request.body;
    const items: string[] = [];
    for (let i = 0; i < tmpItems.length; i++) {
      const { type, duration } = tmpItems[i];
      const item = await ctx.model.TodoItem.create({
        user: _id,
        type,
        duration,
        done: false,
      });
      items.push(item._id);
    }
    await ctx.model.TodoPackage.create({
      user: _id,
      items,
      beginTime,
      endTime,
      title,
    });
    ctx.body = {
      code: 0,
      msg: 'success',
    };
  }

  public async UpdateTodoPackage(ctx: Context) {
    ctx.body = 'API not available.';
  }

  public async DeleteTodoPackage(ctx: Context) {
    ctx.body = 'API not available.';
  }
}
