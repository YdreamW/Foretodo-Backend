import { Context, Controller } from 'egg';

export default class UserController extends Controller {
  /**
   * 微信登录
   */
  public async WechatLogin(ctx: Context) {
    const { code } = ctx.request.body;
    // 与微信服务器交互
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const user = await ctx.app.weappOauth.getUser(code);
    const { openid } = user;
    // 账户逻辑体系判断
    let account;
    account = await this.ctx.service.user.find({ openid });
    // 第一次登录时
    if (!account) {
      // 账户入库
      account = await ctx.service.user.create({
        openid,
        source: 'wechat',
      });
    } else {
      account = await this.ctx.service.user.find({ openid });
    }
    const { _id, nickName, anonymousAvatar } = account;
    const isNew = !nickName;
    const token = this.ctx.service.auth.createToken({ _id });
    ctx.body = {
      code: 0,
      msg: 'success',
      data: {
        _id,
        openid,
        isNew,
        token,
        anonymousAvatar,
      },
    };
  }

  /**
   * 注册基础信息
   */
  public async updateRegisterUserInfo(ctx: Context) {
    const { id } = ctx.params;

    const { avatarUrl, ...info } = ctx.request.body;

    // 将微信头像传到 OSS
    const imgBuffer = await ctx.curl(avatarUrl);
    const avatar = await ctx.service.oss.upload(imgBuffer.data);

    // 更新用户数据
    const user = await ctx.model.User.findByIdAndUpdate(id, {
      avatar,
      role: 'user',
      ...info,
    });

    ctx.body = {
      code: 0,
      msg: 'success',
      data: user,
    };
  }

  /**
   * 自定义获取用户数据
   */
  public async getUserInfoById(ctx: Context) {
    const { id } = ctx.params;
    const { fields } = ctx.query;
    const selectFields =
      fields &&
      fields
        .split(';')
        .map(f => ' +' + f)
        .filter(f => f)
        .join('');

    const user = await ctx.model.User.findById(id).select(selectFields);

    ctx.body = {
      code: 0,
      msg: 'success',
      data: user,
    };
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
        .map(f => ' +' + f)
        .filter(f => f)
        .join('');

    const user = await ctx.model.User.findById(_id)
      .select(selectFields)
      .populate('school faculty major');
    ctx.body = {
      code: 0,
      msg: 'success',
      data: user,
    };
  }

  public async updateUserInfo(ctx: Context) {
    const { id } = ctx.params;
    const { body } = ctx.request;
    await ctx.service.user.update(id, body);

    ctx.body = {
      code: 0,
      msg: 'success',
    };
  }

  /**
   * 修改用户头像
   */
  public async updateUserAvatar(ctx: Context) {
    const { id } = ctx.params;

    const file = ctx.request.files[0];
    const url = await ctx.service.oss.upload(file.filepath, file.filename);
    await ctx.service.user.update(id, { avatar: url });

    ctx.body = {
      code: 0,
      msg: 'success',
    };
  }
}
