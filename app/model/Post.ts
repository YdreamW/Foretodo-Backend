import * as mongoose from 'mongoose';

export default () => {
  const { Schema, model } = mongoose;

  const PostSchema = new Schema(
    {
      __v: { type: Number },
      title: { type: String },
      content: { type: String },
      user: { type: Schema.Types.ObjectId, ref: 'User' },
      item: { type: Schema.Types.ObjectId, ref: 'TodoItem' },
      createAt: { type: Date },
    },
    { timestamps: true },
  );

  return model('Post', PostSchema, 'post');
};
