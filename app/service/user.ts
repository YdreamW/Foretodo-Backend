import { Service } from 'egg';

/**
 * Users Service
 */
export default class Users extends Service {
  async findAll() {
    return await this.ctx.model.User.find();
  }

  async findByOpenId(openId: string) {
    return await this.ctx.model.User.findOne({ openid: openId }).exec();
  }

  async findById(id) {
    return await this.ctx.model.User.findById(id);
  }

  async find(condition) {
    return await this.ctx.model.User.findOne(condition);
  }

  async create(body) {
    return await new this.ctx.model.User(body).save();
  }

  async update(_id, body) {
    return await this.ctx.model.User.findByIdAndUpdate(_id, body);
  }

  async delete(_id) {
    return await this.ctx.model.User.findByIdAndRemove(_id);
  }
}
