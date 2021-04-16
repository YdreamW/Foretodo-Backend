import { Context, Controller } from 'egg';

export default class UserController extends Controller {

  /**
   * ## Wechat Login 微信授权登入接口
   *
   * - Request Body : 用户数据 (nickname, avatar, gender, age ...) + code (登入验证码)
   * - Response Body : user (用户数据) + token
   * */
  public async WechatLogin(ctx: Context) {
    const { code } = ctx.request.body;
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const wechatUser = await ctx.app.weappOauth.getUser(code);
    let user = await ctx.service.user.findByOpenId(wechatUser.openid);

    // 新用户首次登入，进行数据入库
    if (user === undefined) {
      user = await ctx.service.user.create(ctx.request.body);
    }

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
