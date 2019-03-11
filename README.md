# react-app-antd-ts
基于 [Create React App Adding TypeScript](https://facebook.github.io/create-react-app/docs/adding-typescript)， 使用antd+typescript创建React应用。

__ps:__ 基于umi脚手架创建，[参考react-app-umi-antd-ts](https://github.com/zqinmiao/react-app-antd-ts/tree/umi-antd-typesrcipt)

## 相关知识
[react+typescript+antd脚手架搭建](https://github.com/zqinmiao/blog/issues/7)

## vscode 配置
* vscode 插件： Prettier、tslint
* 打开 settings.json 编辑

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

## 文件别名
tsconfig.json，如下：

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

## router 配置

router 配置文件```src/router/routes.tsx```，路由地址不要以 "/" 结尾。

