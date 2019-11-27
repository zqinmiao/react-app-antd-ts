/*
 * @Author: mark.zhang
 * @Date: 2018-12-13 21:28:46
 * @Last Modified by:   mark.zhang
 * @description: 路由配置信息，路由地址不要以“／”结尾
 */

import Loading from "components/loading";
import * as React from "react";
import { IRoutes } from "types/index";
import Wrapper from "./nest-wrapper";
// 之前的代码分割方法
import Loadable2 from "react-loadable";
// 现在的代码分割方法
import loadable from "@loadable/component";


const About = Loadable2({
  loader: () => import("pages/about"),
  loading: Loading
});
const Data = loadable(() => import("pages/data"));
const dynamicRoute = loadable(() => import("pages/dynamic-route"));
import Index from "pages/index";
import User from "pages/user";

function account() {
  return <h3>account</h3>;
}

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

  {
    title: "二级菜单",
    icon: "setting",
    path: "/two-level",
    children: [
      {
        title: "子菜单",
        icon: "setting",
        path: "/two-level/sub",
        component: Setting
      }
    ]
  },

  {
    title: "三级—父级都有component",
    icon: "user",
    path: "/three-level-commonent",
    component: User,
    children: [
      {
        title: "子菜单",
        icon: "appstore",
        path: "/three-level-commonent/sub",
        component: Wrapper,
        children: [
          {
            title: "孙子菜单-one",
            icon: "appstore",
            path: "/three-level-commonent/sub/one",
            component: Data
          },
          {
            title: "孙子菜单-two",
            icon: "appstore",
            noSidebar: true,
            path: "/three-level-commonent/sub/two",
            component: activity
          },
          {
            title: "孙子菜单-动态路由",
            icon: "appstore",
            noSidebar: true,
            path: "/three-level-commonent/:id",
            component: dynamicRoute
          }
        ]
      }
    ]
  },

  {
    title: "三级—父级都无component",
    icon: "form",
    path: "/three-level-no-commonent",
    children: [
      {
        title: "子菜单",
        icon: "bars",
        path: "/three-level-no-commonent/sub",
        children: [
          {
            title: "孙子菜单-one",
            path: "/three-level-no-commonent/sub/one",
            component: orderly
          },
          {
            title: "孙子菜单-two",
            path: "/three-level-no-commonent/sub/two",
            component: unordered
          }
        ]
      }
    ]
  }
];

export default routes;
