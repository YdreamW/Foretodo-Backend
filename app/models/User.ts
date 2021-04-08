import { Application } from 'egg';
import { compare, genSaltSync, hashSync } from 'bcryptjs';

export default (app: Application) => {
  const { mongoose } = app;
  const { Schema, model } = mongoose;

  const UserSchema = new Schema(
    {
      __v: {
        type: Number,
        select: false,
      },
      password: {
        type: String,
        select: false,
      },
      openid: {
        type: String, // 微信 Openid
      },
      role: { type: String, default: 'guest' }, // 用户角色
      qqid: String, // QQ Openid
      unionid: {
        type: String,
        select: false,
      },
      anonymousAvatar: String,
      avatar: {
        type: String,
      },
      gender: {
        type: String,
        select: false,
      },
      city: {
        type: String,
        select: false,
      },
      province: {
        type: String,
        select: false,
      },
      country: {
        type: String,
        select: false,
      },
      nickName: {
        type: String,
      },
      language: {
        type: String,
        select: false,
      },
      grade: { type: String, select: false },
      birth: { type: String, select: false },
      realGender: { type: String, select: false },
      qq: { type: String, select: false },
      cnid: { type: String, select: false },
      mobile: { type: String, select: false },
      email: { type: String, select: false },
      wechat: { type: String, select: false },
      createdAt: { type: Date, select: false },
      isIdentified: Boolean,
      name: { type: String, select: false },
    },
    { timestamps: true },
  );
  UserSchema.pre('save', async function save(next) {
    const user = this;
    if (!user.isModified('password')) {
      return next();
    }
    // @ts-ignore
    user.password = hashSync(user.password, genSaltSync(10));
    next();
  });
  UserSchema.methods.comparePassword = function comparePassword(password) {
    return new Promise((resolve, reject) => {
      compare(password, this.password, (err, isMatch) => {
        if (!err) {
          resolve(isMatch);
        } else reject(err);
      });
    });
  };

  return model('User', UserSchema, 'user');
};
