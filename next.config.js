const path = require('path');
const allowedImageWordpressDomain = new URL(process.env.NEXT_PUBLIC_WORDPRESS_SITE_URL).hostname;

module.exports = {
  trailingSlash: false,
  webpackDevMiddleware: config => {
    config.watchOptions = {
      poll: 1000,
      aggregateTimeout: 300
    };

    return config;
  },
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')]
  },
  images: {
    domains: [allowedImageWordpressDomain]
  },
};