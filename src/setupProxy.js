const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
    app.use(
        '/database',
        createProxyMiddleware({
          target: 'http://localhost:8080',
          changeOrigin: true,
        })
      );
    app.use(
        '/user',
        createProxyMiddleware({
          target: 'http://localhost:8080',
          changeOrigin: true,
        })
      );
};