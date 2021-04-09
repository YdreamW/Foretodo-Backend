import { Application } from 'egg';

export default (app: Application) => {
  const { mongoose } = app;
  const { Schema, model } = mongoose;

  const ItemTypeGroup = new Schema(
    {
      __v: { type: Number },
      name: { type: String },
      itemTypes: [{ type: Schema.Types.ObjectId, ref: 'ItemType' }],
    },
    { timestamps: true },
  );

  return model('ItemTypeGroup', ItemTypeGroup, 'itemTypeGroup');
};
