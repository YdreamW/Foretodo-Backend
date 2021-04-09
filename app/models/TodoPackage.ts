import { Application } from 'egg';

export default (app: Application) => {
  const { mongoose } = app;
  const { Schema, model } = mongoose;

  const TodoPackageSchema = new Schema(
    {
      __v: { type: Number, select: false },
      user: { type: Schema.Types.ObjectId, select: false, ref: 'User' },
      items: [{ type: Schema.Types.ObjectId, select: false, ref: 'TodoItem' }],
      beginTime: { type: Date, select: false },
      endTime: { type: Date, select: false },
    },
    { timestamps: true },
  );

  return model('TodoPackage', TodoPackageSchema, 'todoPackage');
};