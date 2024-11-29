const path = require('path');

module.exports = {
  webpack: (config, env) => {
    if (env === 'production') {
      config.optimization.minimize = false;
    }
    return config;
  },
};
