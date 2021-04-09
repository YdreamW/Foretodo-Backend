import { Application } from 'egg';

export default (app: Application) => {
  const { mongoose } = app;
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
