import { EggAppConfig, EggAppInfo, PowerPartial } from 'egg';

export default (appInfo: EggAppInfo) => {
  // 检查环境变量
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  require('dotenv').config();
  if (!process.env.MONGO_URL || !process.env.JWT_SECRET) {
    console.error('启动失败，缺少必要的环境变量。');
    console.error('若当前环境是开发环境，请新增 .env 文件在根目录');
    console.error(
      '若当前环境是生产环境，请透过 docker 或 k8s 等方式注入環境變量'
    );
    return;
  }

  const config = {} as PowerPartial<EggAppConfig>;

  config.keys = appInfo.name + '_1617861498626_7283';

  config.bodyParser = {
    enable: true,
    enableTypes: ['json', 'form', 'text'],
    extendTypes: {
      text: ['text/xml', 'application/xml', 'application/json'],
    },
  };
  config.middleware = [];
  config.security = {
    csrf: {
      enable: false,
    },
  };
  const bizConfig = {
    sourceUrl: `https://github.com/eggjs/examples/tree/master/${appInfo.name}`,
  };

  config.jwt = {
    secret: 'aewie1dgh2zcoryu238hcQQnruwghaowlq8wk',
  };

  config.weappOauth = {
    appid: process.env.WECHAT_APP_ID,
    secret: process.env.WECHAT_APP_SECRET,
  };

  config.mongoose = {
    client: {
      url: process.env.MONGO_URL,
      options: {
        useUnifiedTopology: true,
      },
    },
  };

  return {
    ...config,
    ...bizConfig,
  };
};
