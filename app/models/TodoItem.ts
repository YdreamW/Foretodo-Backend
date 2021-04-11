import * as mongoose from 'mongoose';

export default () => {
  const { Schema, model } = mongoose;

  const TodoItemSchema = new Schema(
    {
      __v: { type: Number },
      duration: { type: Number },
      user: { type: Schema.Types.ObjectId },
      done: { type: Boolean },
      package: { type: Schema.Types.ObjectId },
      type: { type: Schema.Types.ObjectId, ref: 'ItemType' },
    },
    { timestamps: true },
  );

  return model('TodoItem', TodoItemSchema, 'todoItem');
};
