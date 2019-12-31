const proxy = require("http-proxy-middleware");
 
module.exports = function(app) {
  app.use(
    proxy("/jkz/**", {
      //target: "http://192.168.100.214:8080/",//徐鹏飞
      target: "http://192.168.108.45:8888/",//线上服务器
      changeOrigin: true
    })
  );
};