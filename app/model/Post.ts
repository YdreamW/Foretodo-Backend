import * as mongoose from 'mongoose';

export default () => {
  const { Schema, model } = mongoose;

  const PostSchema = new Schema(
    {
      __v: { type: Number },
      title: { type: String },
      content: { type: String },
      user: { type: Schema.Types.ObjectId, ref: 'User' },
      package: { type: Schema.Types.ObjectId, ref: 'TodoPackage' },
      createAt: { type: Date },
    },
    { timestamps: true },
  );

  return model('Post', PostSchema, 'post');
};
