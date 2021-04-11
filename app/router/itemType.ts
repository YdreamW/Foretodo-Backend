import { Application } from 'egg';

export default (app: Application) => {
  const { controller, router } = app;
  const { checkItemExist, jwtAuth } = app.middleware;

  router.get(
    '/item-type/:_id',
    checkItemExist('ItemType'),
    controller.itemType.GetOneItemType,
  );

  router.get(
    '/item-type',
    controller.itemType.GetManyItemType,
  );

  router.post(
    '/item-type/:_id',
    checkItemExist('ItemType'),
    jwtAuth(),
    controller.itemType.UpdateItemType,
  );

  router.post(
    '/item-type',
    jwtAuth(),
    controller.itemType.InsertItemType,
  );

  router.delete(
    '/item-type/:_id',
    checkItemExist('ItemType'),
    jwtAuth(),
    controller.itemType.DeleteItemType,
  );

};
