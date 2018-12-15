/**
 * 第一次启动项目时，如果之前不存在proxySetting.js文件
 * 此时会在同级目录根据本样例生成一个proxySetting.js文件
 * 需要修改生成的proxySetting.js文件中的target地址为正确地址，再重新启动
 */
module.exports = {
  "/api":{
    target:"https://some-path.some-domain.com",
    changeOrigin: true
  }
}