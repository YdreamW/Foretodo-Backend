import { Context, Controller } from 'egg';

export default class ItemTypeGroupController extends Controller {

  public async GetOneItemTypeGroup(ctx: Context) {
    const todoItemId = ctx.params._id;
    ctx.body = await ctx.model.TodoItem.findById(
      todoItemId,
    ).populate('itemTypes');
  }

  public async GetManyItemTypeGroup(ctx: Context) {
    ctx.body = await ctx.model.TodoItem.find().populate('itemTypes');
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
