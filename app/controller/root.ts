import { Context, Controller } from 'egg';

export default class RootController extends Controller {
  public async HealthCheck(ctx: Context) {
    ctx.status = 200;
    ctx.body = 'Welcome to Foretodo backend service.';
  }

  public async GetTestToken(ctx: Context) {
    ctx.body = 'API not available.';
  }
}
