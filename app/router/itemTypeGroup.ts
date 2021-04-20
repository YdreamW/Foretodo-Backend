import { Application } from 'egg';

export default (app: Application) => {
  const { controller, router } = app;
  const { checkItemExist, jwtAuth } = app.middleware;

  router.get(
    '/item-type-group/:_id',
    checkItemExist('ItemTypeGroup'),
    controller.itemTypeGroup.GetOneItemTypeGroup,
  );

  router.get(
    '/item-type-group',
    jwtAuth(),
    controller.itemTypeGroup.GetManyItemTypeGroup,
  );

  router.post(
    '/item-type-group/:_id',
    checkItemExist('ItemTypeGroup'),
    jwtAuth(),
    controller.itemTypeGroup.UpdateItemTypeGroup,
  );

  router.post(
    '/item-type-group',
    jwtAuth(),
    controller.itemTypeGroup.InsertItemTypeGroup,
  );

  router.delete(
    '/item-type-group/:_id',
    checkItemExist('ItemTypeGroup'),
    jwtAuth(),
    controller.itemTypeGroup.DeleteItemTypeGroup,
  );
};
