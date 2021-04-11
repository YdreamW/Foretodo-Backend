import { Service } from 'egg';

/**
 * TodoItem Service
 */
export default class TodoItem extends Service {

  async findAll() {
    return await this.ctx.model.TodoItem.find();
  }

  async findById(id) {
    return await this.ctx.model.TodoItem.findById(id);
  }

  async find(condition) {
    return await this.ctx.model.TodoItem.findOne(condition);
  }

  async create(body) {
    return await new this.ctx.model.TodoItem(body).save();
  }

  async update(_id, body) {
    return await this.ctx.model.TodoItem.findByIdAndUpdate(_id, body);
  }

  async delete(_id) {
    return await this.ctx.model.TodoItem.findByIdAndRemove(_id);
  }
}
