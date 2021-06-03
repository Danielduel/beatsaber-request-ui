const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    "/helix",
    createProxyMiddleware({
      target: "https://api.twitch.tv",
      changeOrigin: true
    })
  );
  app.use(
    "/kraken",
    createProxyMiddleware({
      target: "https://api.twitch.tv",
      changeOrigin: true,
      logLevel: "debug"
    })
  );
}
