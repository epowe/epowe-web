const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function(app) {
  app.use(
    "/afterLogin",
    createProxyMiddleware({
      target: "http://localhost:8080",
      pathRewrite: {
        "^/afterLogin": "",
      },
    })
  );
};
