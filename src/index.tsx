import NProgress from "nprogress"; // progress bar
import "nprogress/nprogress.css"; // progress bar style
import * as React from "react";
import * as ReactDOM from "react-dom";
import { Provider } from "react-redux";
import store from "redux/store";
import { getUserInfo } from "services/api";
import routes from "src/router/routes";
import "src/styles/index.scss";
import { setToken } from "utils/auth";
import { extractRoute, getMenuSelectedAndOpenKeys } from "utils/sidebar";
import App from "./App";

// mock数据
import "./mock/index";

import registerServiceWorker from "./registerServiceWorker";

NProgress.configure({ showSpinner: false });
NProgress.start();
// 查看是否有token
beforeRender().then(() => {
  NProgress.done();
  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.getElementById("root") as HTMLElement
  );
});

// mock user info

// render之前需要做的异步请求：获取配置信息、获取用户信息、生成菜单
async function beforeRender() {
  const config: any = {
    config: {}
  };
  const res: any = await getUserInfo(true);
  console.log(res);
  const { token, id, avatar, name } = res.data;
  let isLogin = false;
  if (res.code === 200) {
    isLogin = true;
    setToken(token);
  }
  const userInfo: any = {
    userInfo: {
      name,
      id,
      avatar
    }
  };
  initStoreState();
  store.dispatch({
    type: "SET_BASE_CONFIG",
    payload: { ...config, ...userInfo, ...{ isLogin } }
  });
  return;
}

// 初始化redux store state
function initStoreState(): void {
  const isLogin = true;
  const extractRouteMap = extractRoute(routes, [], []);
  const extractAllRoutes = extractRouteMap.all;
  // 根据全部展开的路由来获取面包屑映射
  const breadcrumbMap = extractRouteMap.all.reduce((obj: any, item: any) => {
    const key = item.path;
    return { ...obj, [`${key}`]: item };
  }, {});
  const extractFilterRoutes = extractRouteMap.filter;
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
      routes,
      extractAllRoutes,
      extractFilterRoutes,
      breadcrumbMap,
      selectedKeys,
      openKeys
    }
  });
}

registerServiceWorker();
