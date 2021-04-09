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
      openid: {
        type: String, // 微信 Openid
      },
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
      birth: { type: String, select: false },
      cnid: { type: String, select: false },
      email: { type: String, select: false },
      wechat: { type: String, select: false },
      createdAt: { type: Date, select: false },
    },
    { timestamps: true },
  );
  UserSchema.pre('save', async function save(next) {
    const user = this;
    if (!user.isModified('password')) {
      return next();
    }
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
