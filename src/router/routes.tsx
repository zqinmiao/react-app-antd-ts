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

const Bus = Loadable({
  loader: () => import("pages/bus"),
  loading: Loading
});

function Cart() {
  return <h3>Cart</h3>;
}

function Test() {
  return <h3>Test</h3>;
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
    icon: "appstore",
    key: "",
    path: "/about",
    component: About
  },
  {
    title: "用户",
    icon: "bars",
    path: "/user",
    key: "user",
    redirect: "/user/bus",
    component: User,
    routes: [
      {
        title: "用户数据",
        key: "",
        icon: "appstore",
        path: "/user/bus",
        component: Bus
      },
      {
        title: "用户行为",
        icon: "appstore",
        key: "index",
        path: "/user/cart",
        component: Cart
      }
    ]
  },
  {
    title: "测试",
    icon: "appstore",
    path: "/test",
    component: Test
  },
  {
    title: "会员",
    icon: "bars",
    path: "/users",
    component: Wrapper,
    routes: [
      {
        title: "会员中心",
        icon: "appstore",
        path: "/users/d",
        component: Wrapper,
        routes: [
          {
            title: "会员信息",
            key: "",
            path: "/users/d/2",
            component: About
          },
          {
            title: "会员活动",
            key: "index",
            path: "/users/d/1",
            component: Test
          }
        ]
      }
    ]
  },
  {
    title: "关于2.0",
    icon: "appstore",
    path: "/ddd",
    component: About
  }
];
export default routes;
