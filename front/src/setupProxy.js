const createProxyMiddleware = require('http-proxy-middleware');

// package.jsosnに`"proxy": "http://server:5000",`と書いていたのをこちらに移動
module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://server:5000',
      changeOrigin: true,
    })
  );
};

