import * as mongoose from 'mongoose';

export default () => {
  const { Schema, model } = mongoose;

  const UserSchema = new Schema(
    {
      __v: { type: Number },
      openid: { type: String },
      unionid: { type: String },
      anonymousAvatar: { type: String },
      avatar: { type: String },
      gender: { type: String },
      city: { type: String },
      province: { type: String },
      country: { type: String },
      nickName: { type: String },
      birth: { type: String },
      cnid: { type: String },
      email: { type: String },
      wechat: { type: String },
      createdAt: { type: Date },
    },
    { timestamps: true },
  );

  return model('User', UserSchema, 'user');
};
