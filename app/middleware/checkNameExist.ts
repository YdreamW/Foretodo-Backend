/**
 * 检查同学院下是否存在同名教师或课程 如果有则报 409 错误
 * @param Model 需要查询的 model 名称
 */
export default (Model: string) => async (ctx, next) => {
  const { model, throw: throwErr } = ctx;
  // 查询 id 是否存在
  const {
    name,
    faculty: { _id },
  } = ctx.request.body;
  let data;
  try {
    data = await model[Model].findOne({ name, faculty: _id });
  } catch (e) {
    const { value } = e;
    throwErr(422, { value, message: '格式出错' });
  }
  if (data) {
    throwErr(409, '该Model name 在该学院已存在');
  }
  await next();
};
