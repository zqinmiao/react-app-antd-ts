# react-app-antd-ts
Based on [Create React App Adding TypeScript](https://facebook.github.io/create-react-app/docs/adding-typescript). Create React apps using antd+typescript.

__ps:__ 基于umi脚手架创建，[参考react-app-umi-antd-ts](https://github.com/zqinmiao/react-app-antd-ts/tree/umi-antd-typesrcipt)

## 相关知识
[react+typescript+antd脚手架搭建](https://github.com/zqinmiao/blog/issues/7)

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
      "src/*": ["src/*"],
      "components/*":["src/components/*"],
      "pages/*":["src/pages/*"],
      "utils/*":["src/utils/*"],
      "redux/*":["src/redux/*"],
      "services/*":["src/services/*"]
    },
```

## router config

router config file```src/router/routes.tsx```，Routing address does not end with "/"


## Build Setup

```
# install dependencies
yarn install

# serve with hot reload
yarn start

# build for production with minification
yarn build
```