import { EggPlugin } from 'egg';

const plugin: EggPlugin = {
  routerPlus: {
    enable: true,
    package: 'egg-router-plus',
  },
  jwt: {
    enable: true,
    package: 'egg-jwt',
  },
  mongoose: {
    enable: true,
    package: 'egg-mongoose',
  },
  weappOauth: {
    enable: true,
    package: 'egg-weapp-oauth',
  },
};

export default plugin;
