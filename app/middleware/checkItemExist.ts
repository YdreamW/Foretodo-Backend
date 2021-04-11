import { Context } from 'egg';

/**
 * 检查输入 id 对应的数据是否存在
 * @param Model 需要查询的 model 名称
 */
export default (Model: string) => async (ctx: Context, next) => {
  const { model, throw: throwErr } = ctx;
  const { _id } = ctx.params;
  // 查询 id 是否存在
  let data;
  try {
    data = await model[Model].findById(_id);
  } catch (e) {
    const { value } = e;
    throwErr(422, { value, message: 'id 格式出错' });
  }
  if (!data) {
    throwErr(404, 'id不存在,请检查输入');
  }
  await next();
};
