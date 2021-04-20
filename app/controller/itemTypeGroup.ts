import { Context, Controller } from 'egg';

export default class ItemTypeGroupController extends Controller {
  public async GetOneItemTypeGroup(ctx: Context) {
    const todoItemId = ctx.params._id;
    ctx.body = await ctx.model.TodoItem.findById(todoItemId).populate(
      'itemTypes'
    );
  }

  public async GetManyItemTypeGroup(ctx: Context) {
    const itemTypeGroup = await ctx.model.ItemTypeGroup.find().populate(
      'itemTypes'
    );
    ctx.body = {
      code: 0,
      msg: 'success',
      data: { itemTypeGroup },
    };
  }

  public async InsertItemTypeGroup(ctx: Context) {
    ctx.body = 'API Not Available.';
  }

  public async UpdateItemTypeGroup(ctx: Context) {
    ctx.body = 'API Not Available.';
  }

  public async DeleteItemTypeGroup(ctx: Context) {
    ctx.body = 'API Not Available.';
  }
}
