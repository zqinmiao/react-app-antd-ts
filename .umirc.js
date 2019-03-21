
// ref: https://umijs.org/config/
export default {
  treeShaking: true,
  hash:true,
  context:{
    publicPath:"/"
  },
  publicPath:"/static/",
  "manifest": {
    "basePath": "/",
    "publicPath":""
  },
  cssPublicPath:"/",
  // "copy": [
  //   {
  //     "from": "*.css",
  //     "to": "static/"
  //   },
  //   {
  //     "from": "*.js",
  //     "to": "static/"
  //   },
  // ],
  // CSS Module 关闭
  // "disableCSSModules": true,
  // 指定项目目录下的文件不走 css modules，格式为数组，项必须是 css 或 less 文件（ps：设置了不生效）
  // cssModulesExcludes:["./src/layouts/index.less"],
  plugins: [
    // ref: https://umijs.org/plugin/umi-plugin-react.html
    ['umi-plugin-react', {
      antd: true,
      dva: false,
      dynamicImport: { webpackChunkName: true },
      title: 'umi-test',
      dll: false,
      routes: {
        exclude: [
          /components\//,
        ],
      },
    }],
  ],
  routes: [
    { path: '/', component: '../layouts/index',
    routes: [
        { path: '', component: './index' },
      ]
    },
    { path: '/test', component: './economy',Routes: ['./routes/PrivateRoute.js'] }
  ],
}
