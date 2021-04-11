import { EggAppConfig, EggAppInfo, PowerPartial } from 'egg';

export default (appInfo: EggAppInfo) => {
  const config = {} as PowerPartial<EggAppConfig>;

  config.keys = appInfo.name + '_1617861498626_7283';

  config.middleware = [];

  const bizConfig = {
    sourceUrl: `https://github.com/eggjs/examples/tree/master/${appInfo.name}`,
  };

  config.jwt = {
    secret: 'aewie1dgh2zcoryu238hcQ*Q#nruwghaowlq8wk',
  };

  config.weappOauth = {
    appid: '',
    secret: '',
  };

  return {
    ...config,
    ...bizConfig,
  };
};

exports.mongoose = {
  client: {
    url: 'mongodb://127.0.0.1/example',
  },
};
