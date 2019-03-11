# react-app-umi-antd-ts
基于umi脚手架创建
Based on [create-umi-app](https://umijs.org/zh/guide/create-umi-app.html). Create React apps using antd+typescript.

## 相关知识
[react+typescript+antd脚手架搭建](https://github.com/zqinmiao/blog/issues/7)

[参考UmiJS官方文档](https://umijs.org/zh/)


## vscode config
* vscode extension： Prettier、tslint
* open settings.json edit

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

## file alias
tsconfig.json，For Example：

```
"paths": {
      "@/*": ["src/*"]
    },
```


## Build Setup

```
# install dependencies
yarn install

# serve with hot reload
yarn start

# build for production with minification
yarn build
```