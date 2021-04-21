import * as mongoose from 'mongoose';

export default () => {
  const { Schema, model } = mongoose;

  const TodoPackageSchema = new Schema(
    {
      __v: { type: Number, select: true },
      user: { type: Schema.Types.ObjectId, select: true, ref: 'User' },
      items: [{ type: Schema.Types.ObjectId, select: true, ref: 'TodoItem' }],
      title: { type: String, select: true },
      beginTime: { type: Date, select: true },
      endTime: { type: Date, select: true },
    },
    { timestamps: true }
  );

  return model('TodoPackage', TodoPackageSchema, 'todoPackage');
};
