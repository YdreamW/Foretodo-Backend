import { Service } from 'egg';
import * as crypto from 'crypto';

/**
 * Auth Service
 */
export default class Auth extends Service {
  /**
   * 生成 Token,默认一天
   * @param {Object} data
   * @param time string 时间 1m,6h,12d等 默认单位为ms
   */
  public createToken(data, time = '1d') {
    const { app } = this.ctx;
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return app.jwt.sign(data, app.config.jwt.secret, {
      expiresIn: time,
    });
  }

  /**
   * 验证token的合法性
   * @param {String} token
   */
  public async verifyToken(token) {
    const { app } = this.ctx;
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return await app.jwt.verify(token, app.config.jwt.secret);
  }

  /**
   * 获取微信 AccessToken
   */
  public async getWechatAK() {
    const { ctx } = this;
    const { wechatAccessToken, wechatAKExpiresIn } = ctx.state;

    // 判断是否过期
    if (wechatAKExpiresIn < Date.now()) {
      return wechatAccessToken;
    }
    // 重新获取 AccessToken
    const { access_token, expires_in } = await this.checkWechatAK();
    // 将微信 AK 和过期时间存入去全局 state
    ctx.state.wechatAccessToken = access_token;
    ctx.state.wechatAKExpiresIn = Date.now() + (expires_in - 30 * 60) * 1000; // 过期时间提前 15 分钟

    return access_token;
  }

  /**
   * 检查微信AccessToken 是否过期
   */
  public async checkWechatAK() {
    const { ctx } = this;
    const { appid, secret } = ctx.app.config.weappOauth;
    const url = `https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=${appid}&secret=${secret}`;

    const { data } = await ctx.curl(url);
    const { access_token, expires_in } = JSON.parse(data);

    // 将微信 AK 和过期时间存入去全局 state
    ctx.state.wechatAccessToken = access_token;
    ctx.state.wechatAKExpiresIn = Date.now() + (expires_in - 30 * 60) * 1000; // 过期时间提前 15 分钟

    return { access_token, expires_in };
  }

  public async getQQCode(code, encryptedData?, iv?) {
    const { ctx } = this;
    const { appid, secret } = ctx.app.config.qqAppOauth;

    const url = 'https://api.q.qq.com/sns/jscode2session';
    const pkg = {
      appid,
      secret,
      js_code: code,
      grant_type: 'authorization_code',
    };
    const { status, data } = await ctx.curl(url, {
      method: 'GET',
      dataType: 'json',
      data: pkg,
    });
    if (status !== 200) throw new Error('bad request');
    if (data.errcode || data.errmsg) throw new Error(data.errmsg);

    if (encryptedData) {
      data.userInfo = this.decrypt(encryptedData, data.session_key, iv);
    }
    return data;
  }

  private decrypt = (encryptedData, key, iv) => {
    key = new Buffer(key, 'base64');
    iv = new Buffer(iv, 'base64');
    const decipher = crypto.createDecipheriv('aes-128-cbc', key, iv);
    decipher.setAutoPadding(true);
    let decoded = decipher.update(encryptedData, 'base64', 'utf8');
    decoded += decipher.final('utf8');
    return JSON.parse(decoded);
  };
}
