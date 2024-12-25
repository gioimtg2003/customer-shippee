interface IEnvironmentConfig {
  [key: string]: {
    appUrl: string;
    apiUrl: string;
  };
}

const EnvironmentConfig: IEnvironmentConfig = {
  development: {
    apiUrl: 'http://10.0.2.2:5000/api',
    appUrl: 'http://192.168.1.75:3000',
  },

  dev: {
    appUrl: 'http://app-shippee.nguyenconggioi.me',
    apiUrl: 'https://shippee-api.nguyenconggioi.me/api',
  },

  production: {
    appUrl: 'http://app-shippee.nguyenconggioi.me',
    apiUrl: 'http://shippee-api.nguyenconggioi.me/api',
  },
};

export const appConfig = () => {
  const env = process.env.NODE_ENV || 'local';
  const conf = EnvironmentConfig[env];
  console.log(process.env.NODE_ENV);
  if (env !== 'production') {
    console.log(conf);
  }
  return conf;
};
