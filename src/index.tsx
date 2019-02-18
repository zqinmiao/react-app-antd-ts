import NProgress from "nprogress"; // progress bar
import "nprogress/nprogress.css"; // progress bar style
import Exception from "pages/exception/index";
import * as React from "react";
import * as ReactDOM from "react-dom";
import { Provider } from "react-redux";
import store from "redux/store";
import { getUserInfo } from "services/api";
import routes from "src/router/routes";
import "src/styles/index.scss";
import { IBreadcrumbMap, IRoutes } from "types/index";
import { getToken } from "utils/auth";
import { extractRoute, getMenuSelectedAndOpenKeys } from "utils/sidebar";
import App from "./App";

// mock数据
import "./mock/index";

import * as serviceWorker from "./serviceWorker";

NProgress.configure({ showSpinner: false });
NProgress.start();
// 查看是否有token
beforeRender()
  .then(() => {
    ReactDOM.render(
      <Provider store={store}>
        <App />
      </Provider>,
      document.getElementById("root") as HTMLElement
    );
  })
  .catch(err => {
    console.log(err);
    ReactDOM.render(
      <Exception title="" desc="服务器出了点小差错，请等会再来" />,
      document.getElementById("root") as HTMLElement
    );
  })
  .finally(() => {
    NProgress.done();
  });

// mock user info

// render之前需要做的异步请求：获取配置信息、获取用户信息、生成菜单
async function beforeRender() {
  let isLogin = false;
  let userInfo = null;
  const filterPathname = location.pathname.replace(/\/$/, "");
  if (filterPathname !== "/login" && getToken()) {
    const {
      data: {
        code,
        result: { name, id }
      }
    } = await getUserInfo(true);
    if (code === 0) {
      isLogin = true;
      userInfo = {
        name,
        id
      };
    }
  }

  const extractRouteMap = extractRoute(routes, [], [], []);
  const extractAllRoutes = extractRouteMap.all;
  // 根据全部展开的路由来获取面包屑映射
  const breadcrumbMap = extractAllRoutes.reduce(
    (obj: IBreadcrumbMap, item: IRoutes): IBreadcrumbMap => {
      const key = item.path;
      return { ...obj, [`${key}`]: item };
    },
    {}
  );
  const extractFilterRoutes = extractRouteMap.filter;
  // 可跳转的路由映射
  const realRouteMap = extractFilterRoutes.reduce(
    (obj: IBreadcrumbMap, item: IRoutes): IBreadcrumbMap => {
      const key = item.path;
      return { ...obj, [`${key}`]: item };
    },
    {}
  );
  const firstLink = extractFilterRoutes[0].path;
  const menuSelectedOpen = getMenuSelectedAndOpenKeys(
    extractFilterRoutes,
    breadcrumbMap
  );
  const selectedKeys = [menuSelectedOpen.selectedKey];
  const openKeys = menuSelectedOpen.openKeys;
  store.dispatch({
    type: "INIT_STATE",
    payload: {
      isLogin,
      userInfo,
      firstLink,
      routes,
      extractAllRoutes,
      extractFilterRoutes,
      searchSidebar: extractRouteMap.searchSidebar,
      breadcrumbMap,
      realRouteMap,
      selectedKeys,
      openKeys
    }
  });
  return;
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
