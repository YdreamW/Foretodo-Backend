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

    console.log(wechatUser);
    const { openid } = wechatUser;
    let user = await ctx.service.user.findByOpenId(openid);

    const isNew = !(user && user.nickName);
    // 新用户首次登入，进行数据入库
    if (!user) {
      // user = await new this.ctx.model.User({
      //   openid,
      // }).save();
      user = await ctx.service.user.create({
        openid,
      });
    }

    const { _id } = user;
    const token = this.ctx.service.auth.createToken({ _id });
    ctx.body = { code: 0, msg: 'success', data: { _id, openid, isNew, token } };
  }

  public async getUserInfo(ctx: Context) {
    const {
      user: { _id },
    } = ctx.state;
    const { fields } = ctx.query;
    const selectFields =
      fields &&
      fields
        .split(';')
        .map((f) => ' +' + f)
        .filter((f) => f)
        .join('');

    const user = await ctx.model.User.findById(_id).select(selectFields);
    ctx.body = {
      code: 0,
      msg: 'success',
      data: user,
    };
  }

  /**
   * 注册基础信息
   */
  public async updateRegisterUserInfo(ctx: Context) {
    const { id } = ctx.params;

    const { avatarUrl: avatar, ...info } = ctx.request.body;

    console.log(ctx.request.body);
    // 更新用户数据
    const user = await ctx.model.User.findByIdAndUpdate(id, {
      avatar,
      ...info,
    });

    ctx.body = {
      code: 0,
      msg: 'success',
      data: user,
    };
  }

  public async updateUserInfo(ctx: Context) {
    const { _id } = ctx.params;
    const { body } = ctx.request;
    ctx.body = await ctx.service.user.update(_id, body);
  }
}
