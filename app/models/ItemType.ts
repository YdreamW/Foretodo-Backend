import { Application } from 'egg';

export default (app: Application) => {
  const { mongoose } = app;
  const { Schema, model } = mongoose;

  const ItemTypeSchema = new Schema(
    {
      __v: { type: Number },
      name: { type: String },
      group: { type: Schema.Types.ObjectId, ref: 'ItemTypeGroup' },
    },
    { timestamps: true },
  );

  return model('ItemType', ItemTypeSchema, 'itemType');
};
