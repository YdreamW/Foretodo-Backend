import { Context, Controller } from 'egg';

export default class UserController extends Controller {

  public async WechatLogin(ctx: Context) {
    const { code } = ctx.request.body;
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const user = await ctx.app.weappOauth.getUser(code);
    const token = this.ctx.service.auth.createToken(user._id);
    ctx.body = { user, token };
  }

  public async getUserInfo(ctx: Context) {
    const { user: { _id } } = ctx.state;
    const { fields } = ctx.query;
    const selectFields =
      fields &&
      fields
        .split(';')
        .map(f => ' +' + f)
        .filter(f => f)
        .join('');

    ctx.body = await ctx.model.User.findById(_id).select(selectFields);
  }

  public async updateUserInfo(ctx: Context) {
    const { _id } = ctx.params;
    const { body } = ctx.request;
    ctx.body = await ctx.service.user.update(_id, body);
  }
}
