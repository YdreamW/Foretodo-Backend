module.exports = app => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const mongoose = app.mongoose;
  const { Schema, model } = mongoose;
  const TodoItemSchema = new Schema(
    {
      __v: { type: Number },
      duration: { type: Number },
      user: { type: Schema.Types.ObjectId, ref: 'User' },
      done: { type: Boolean },
      package: { type: Schema.Types.ObjectId, ref: 'TodoPackage' },
      type: { type: Schema.Types.ObjectId, ref: 'ItemType' },
    },
    { timestamps: true },
  );

  return model('TodoItem', TodoItemSchema);
};
