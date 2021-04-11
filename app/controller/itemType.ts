import { Context, Controller } from 'egg';

export default class ItemTypeController extends Controller {

  public async GetOneItemType(ctx: Context) {
    const itemTypeId = ctx.params._id;
    ctx.body = await ctx.model.ItemType.findById(
      itemTypeId,
    ).populate('group');
  }

  public async GetManyItemType(ctx: Context) {
    ctx.body = await ctx.model.ItemType.find().populate('group');
  }

  public async InsertItemType(ctx: Context) {
    ctx.body = 'API not available.';
  }

  public async UpdateItemType(ctx: Context) {
    ctx.body = 'API not available.';
  }

  public async DeleteItemType(ctx: Context) {
    ctx.body = 'API not available.';
  }

}
