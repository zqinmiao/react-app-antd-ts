/*
 * @Author: mark.zhang
 * @Date: 2018-12-13 21:28:46
 * @Last Modified by:   mark.zhang
 * @description: 路由配置信息，路由地址不要以“／”结尾
 */

/**
 * import asyncComponent from "components/async-component"
 * 现在的代码分割方法
 */
import loadable from "@loadable/component";
import Loading from "components/loading";
import * as React from "react";

// 之前的代码分割方法
import Loadable2 from "react-loadable";
import { IRoutes } from "types/index";

// Code Splitting lazy loaded
const About = Loadable2({
  loader: () => import("pages/about"),
  loading: Loading
});

import Index from "pages/index";
import User from "pages/user";

// 之前的代码分割方法
// const Data = Loadable2({
//   loader: () => import("pages/data"),
//   loading: Loading
// });

const Data = loadable(() => import("pages/data"));

// const Data = asyncComponent(() => import("pages/data"));

// import Data from "pages/data";
// const Data = React.lazy(() => import('pages/data'));

function activity() {
  return <h3>activity</h3>;
}

function Setting() {
  return <h3>Setting</h3>;
}

function orderly() {
  return <h3>orderly</h3>;
}

function unordered() {
  return <h3>unordered</h3>;
}

const routes: IRoutes[] = [
  {
    title: "首页",
    icon: "appstore",
    exact: true,
    path: "/index",
    component: Index
  },
  {
    title: "关于",
    icon: "eye",
    path: "/about",
    component: About
  },
  {
    title: "用户",
    icon: "user",
    path: "/user",
    component: User,
    routes: [
      {
        title: "用户数据",
        icon: "appstore",
        path: "/user/data",
        routes: [
          {
            title: "用户数据",
            icon: "appstore",
            path: "/user/data/index",
            component: Data
          },
          {
            title: "用户行为",
            icon: "appstore",
            noSidebar: true,
            path: "/user/data/activity",
            component: activity
          }
        ]
      },
      {
        title: "关于用户",
        icon: "appstore",
        path: "/user/about",
        component: About
      }
    ]
  },
  {
    title: "设置",
    icon: "setting",
    path: "/setting",
    component: Setting
  },
  {
    title: "表单",
    icon: "form",
    path: "/form",
    routes: [
      {
        title: "列表",
        icon: "bars",
        path: "/form/list",
        routes: [
          {
            title: "有序列表",
            path: "/form/list/orderly",
            component: orderly
          },
          {
            title: "无序列表",
            path: "/form/list/unordered",
            component: unordered
          }
        ]
      }
    ]
  }
];
export default routes;
