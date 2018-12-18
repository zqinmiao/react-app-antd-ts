/*
 * @Author: mark.zhang
 * @Date: 2018-11-28 18:02:23
 * @Last Modified by:   mark.zhang
 * @description: 侧边栏相关的方法
 */

/**
 * @description 默认匹配菜单的第一个
 * @param route 路由项
 * @param keys 菜单的key值的列表
 */
const matchSelectedSidebar = (route: any, key = "/"): string => {
  if (route.routes && route.routes.length > 0) {
    const list = route.routes;
    key = list[0].path;
    matchSelectedSidebar(list[0], key);
  }
  return key;
};

/**
 * @description 根据选中的菜单匹配所对应的菜单展开
 * @param selectedKey 选中的菜单项的key
 * @returns 展开的菜单项
 */
export const matchOpenKeys = (selectedKey: string): string[] => {
  const selectedKeys = selectedKey.split("/");

  const openKeys: string[] = [];

  selectedKeys.forEach((item: string, index: number) => {
    const level = selectedKeys.slice(0, index + 1).join("/");
    openKeys.push(level);
  });
  return openKeys;
};

// 获取选中的菜单和展开的菜单项
export const getMenuSelectedAndOpenKeys = (
  extractFilterRoutes: any[],
  breadcrumbMap: any
) => {
  // 选中的菜单
  let selectedKey: string = location.pathname.replace(/\/$/, "")
    ? location.pathname.replace(/\/$/, "")
    : "/";

  // 展开的菜单项
  let openKeys: string[] = [];

  // 查找当前path是否在路由表中
  const findPath = extractFilterRoutes.find((item: any) => {
    return item.path === selectedKey;
  });
  // 如果不存在
  if (!findPath) {
    // 是否存在redirect
    if (breadcrumbMap[selectedKey] && breadcrumbMap[selectedKey].redirect) {
      selectedKey = breadcrumbMap[selectedKey].redirect;
    } else {
      // 全部路由映射中是否存在
      if (breadcrumbMap[selectedKey]) {
        // 过滤出所选侧边栏地址的数组
        const selectedKeyArr = selectedKey.split("/").filter(item => item);

        // 找到上一层的地址
        const prePath = `/${selectedKeyArr.slice(0, -1).join("/")}`;

        if (breadcrumbMap[prePath] && breadcrumbMap[prePath].redirect) {
          selectedKey = breadcrumbMap[prePath].redirect;
        }
      } else {
        selectedKey = "";
      }
    }
  }

  openKeys = matchOpenKeys(selectedKey);
  return { selectedKey, openKeys };
};

/**
 * @description 提取嵌套路由，变为单层数组
 * @param routeList 路由配置
 * @param all 全部展开的路由列表
 * @param filter 过滤redirect的路由
 */
export const extractRoute = (
  routeList: any[],
  all: any[],
  filter: any[]
): any => {
  routeList.forEach((route: any, index: number) => {
    if (route.routes && route.routes.length > 0) {
      // 如果存在重定向
      if (route.redirect) {
        const redirectRoute = route.routes.find(
          (item: any) => item.path === route.redirect
        );
        all.push({
          title: route.title,
          key: route.key,
          path: route.path,
          redirect: route.redirect,
          component: route.component,
          routes: route.routes
        });
        filter.push({
          title: redirectRoute.title,
          key: redirectRoute.key,
          path: route.redirect,
          component: redirectRoute.component
        });

        return extractRoute(route.routes, all, filter.slice(0, -1));
      } else {
        all.push({
          title: route.title,
          key: route.key,
          path: route.path,
          component: route.component,
          routes: route.routes
        });
        return extractRoute(route.routes, all, filter);
      }
    } else {
      all.push({
        title: route.title,
        key: route.key,
        path: route.path,
        component: route.component
      });
      filter.push({
        title: route.title,
        key: route.key,
        path: route.path,
        component: route.component
      });
    }
  });
  return { all, filter };
};
