/*
 * @Author: mark.zhang
 * @Date: 2018-12-13 21:28:46
 * @Last Modified by:   mark.zhang
 * @description: 路由配置信息，路由地址不要以“／”结尾
 */

import Loading from "components/loading";
import * as React from "react";
import Loadable from "react-loadable";
import Wrapper from "./only-wrapper-route";

// Code Splitting lazy loaded
const About = Loadable({
  loader: () => import("pages/about"),
  loading: Loading
});

import Index from "pages/index";
import User from "pages/user";

const Data = Loadable({
  loader: () => import("pages/data"),
  loading: Loading
});

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

const routes: any[] = [
  {
    title: "首页",
    icon: "appstore",
    exact: true,
    key: "index",
    path: "/",
    component: Index
  },
  {
    title: "关于",
    icon: "eye",
    key: "",
    path: "/about",
    component: About
  },
  {
    title: "用户",
    icon: "user",
    path: "/user",
    key: "user",
    redirect: "/user/data",
    component: User,
    routes: [
      {
        title: "用户数据",
        key: "",
        icon: "appstore",
        path: "/user/data",
        component: Data
      },
      {
        title: "用户行为",
        icon: "appstore",
        key: "index",
        path: "/user/activity",
        component: activity
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
    component: Wrapper,
    routes: [
      {
        title: "列表",
        icon: "bars",
        path: "/form/list",
        component: Wrapper,
        routes: [
          {
            title: "有序列表",
            key: "",
            path: "/form/list/orderly",
            component: orderly
          },
          {
            title: "无序列表",
            key: "index",
            path: "/form/list/unordered",
            component: unordered
          }
        ]
      }
    ]
  }
];
export default routes;
