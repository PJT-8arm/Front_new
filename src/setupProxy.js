const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/ws',
    createProxyMiddleware({
      target: 'http://api.arm.genj.me',
      changeOrigin: true,
      ws: true,
    })
  );
};