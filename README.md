# react-app-antd-ts
Based on create-react-app-typescript. Create React apps using antd+typescript.


## vscode下配置的代码检查
* vscode安装扩展 Prettier、tslint
* 打开settings.json复制以下代码到里面

```
"tslint.autoFixOnSave": true,
  "[scss]": {
    "editor.formatOnSave": true
  },
  "[typescriptreact]": {
    "editor.formatOnSave": true
  },
  "[typescript]": {
    "editor.formatOnSave": true
  }
```

## 设置文件别名
在tsconfig.json中设置，如：

```
"paths": {
      "src/*": ["src/*"],
      "components/*":["src/components/*"],
      "pages/*":["src/pages/*"],
      "utils/*":["src/utils/*"],
      "redux/*":["src/redux/*"],
      "services/*":["src/services/*"]
    },
```

## 路由配置

前端静态路由配置在```src/router/routes.tsx```，路由地址不要以“／”结尾


## Build Setup

```
# install dependencies
yarn install

# serve with hot reload
yarn start

# build for production with minification
yarn build
```