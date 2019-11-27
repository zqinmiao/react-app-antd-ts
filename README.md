# react-app-antd-ts
基于 [Create React App Adding TypeScript](https://facebook.github.io/create-react-app/docs/adding-typescript)， 使用redux+antd+typescript创建React应用。

__ps:__ 基于umi脚手架创建，[参考react-app-umi-antd-ts](https://github.com/zqinmiao/react-app-antd-ts/tree/umi-antd-typesrcipt)

## 相关知识
[react+typescript+antd脚手架搭建](https://github.com/zqinmiao/blog/issues/7)


## 文件别名
tsconfig.json，如下：

```json
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

## 面包屑

面包屑的显示与路由的```path```路径的层级关联，如下路由配置：

```javascript
{
  title: "普通一级菜单",
  icon: "eye",
  path: "/common-level",
  exact: true,
  component: About
},
{
  title: "一级—非嵌套子级",
  icon: "bulb",
  path: "/common-level/no-nest-sub",
  component: account
},
```

```/common-level```对应：```普通一级菜单```,```/common-level/no-nest-sub```对应：```一级—非嵌套子级```,最终面包屑渲染的层级为：```普通一级菜单/一级—非嵌套子级```,且```普通一级菜单```可点。


