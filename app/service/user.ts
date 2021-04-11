import { Service } from 'egg';

/**
 * Users Service
 */
export default class Users extends Service {

  async findAll() {
    return await this.ctx.model.User.find();
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

  /**
   * 判断Item是否在用户的Item列表中,如果不在则加入
   * @param Array 对象数组 courses | teachers
   * @param uid User Id
   * @param id 对象数组
   */
  async addItem(Array: 'courses' | 'teachers', uid, id) {
    const user = await this.ctx.model.User.findById(uid).select(
      'courses teachers',
    );
    await this.ctx.helper.checkExistThenAdd(user, Array, id);
  }

  /**
   * 从用户的 Item 列表中删除 id
   * @param Array 对象数组 courses | teachers
   * @param uid User Id
   * @param id 对象数组
   */
  async deleteItem(Array: 'courses' | 'teachers', uid, id) {
    const user = await this.ctx.model.User.findById(uid).select(
      'courses teachers',
    );
    await this.ctx.helper.deleteId(user, Array, id);
  }

  async syncGrade(id, data) {
    const { ctx } = this;
    const user = await ctx.model.User.findById(id).select('grades');
    for (const datum of data) {
      const {
        id, // 内部成绩编号
        score, // 成绩
        gpa, // 绩点
        academic,
        semester,
        cid,
        tid,
      } = datum;
      // 判断该记录是否存在
      const isExist =
        user.grades.findIndex(grade => grade && grade.id.toString() === id) >
        -1;
      // 如果存在继续下一步
      if (!isExist) {
        // 默认只有一条记录
        const course = await ctx.model.Course.findOne({ innerCode: cid });
        const teacher = await ctx.model.Teacher.findOne({ innerCode: tid });
        user.grades.push({
          id, // 官方 Id
          gpa,
          score,
          course: course._id,
          teacher: teacher._id,
          semester, // 上或者下学期 1上 2下
          academic, // 学年 2016-2017
        });
      }
    }
    user.save();
  }
}
