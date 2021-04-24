import { Context, Controller } from 'egg';

export default class PostController extends Controller {
  public async GetOnePost(ctx: Context) {
    const postId = ctx.params.id;
    const post = await ctx.model.Post.findById(
      postId,
    ).populate({
      path: 'package user',
    });
    ctx.body = {
      code: 0,
      msg: 'success',
      data: { post },
    };
  }

  public async GetManyPost(ctx: Context) {
    const posts = await ctx.model.Post.find().populate({
      path: 'user package',
    });
    ctx.body = {
      code: 0,
      msg: 'success',
      data: { posts },
    };
  }

  public async InsertPost(ctx: Context) {
    const {
      user: { _id },
    } = ctx.state;
    const { title, content, packageId } = ctx.request.body;
    const post = await ctx.model.Post.create({
      user: _id,
      title,
      content,
      package: packageId,
      createAt: new Date(),
    });
    ctx.body = {
      code: 0,
      msg: 'success',
      data: post,
    };
  }
}
