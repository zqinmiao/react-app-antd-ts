# react-app-umi-antd-ts
基于 [create-umi-app](https://umijs.org/zh/guide/create-umi-app.html)， 使用 umi+antd+typescript创建React应用。

## 相关知识
[react+typescript+antd脚手架搭建](https://github.com/zqinmiao/blog/issues/7)

[参考UmiJS官方文档](https://umijs.org/zh/)


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
      "@/*": ["src/*"]
    },
```

