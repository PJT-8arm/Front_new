const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/ws',
    createProxyMiddleware({
      target: 'https://api.arm.genj.me',
      changeOrigin: true,
      ws: true,
    })
  );
};