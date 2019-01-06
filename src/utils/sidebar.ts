/*
 * @Author: mark.zhang
 * @Date: 2018-11-28 18:02:23
 * @Last Modified by:   mark.zhang
 * @description: 侧边栏相关的方法
 */
import pathToRegexp from "path-to-regexp";
import { IBreadcrumbMap, IRoutes } from "types/index";

/**
 * @description 默认匹配菜单的第一个
 * @param route 路由项
 * @param keys 菜单的key值的列表
 */
const matchSelectedSidebar = (route: IRoutes, key = "/"): string => {
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

/**
 * @description 匹配路径（包括动态路径）
 * @param pathname 路径
 * @param breadcrumbMap 所有路由映射
 * @returns 匹配后的路由项
 */
export const matchParamsPath = (
  pathname: string,
  breadcrumbMap: IBreadcrumbMap
): IRoutes => {
  const pathKey: string | undefined = Object.keys(breadcrumbMap).find(key =>
    pathToRegexp(key).test(pathname)
  );
  return breadcrumbMap[`${pathKey}`];
};

// 获取选中的菜单和展开的菜单项
export const getMenuSelectedAndOpenKeys = (
  extractFilterRoutes: IRoutes[],
  breadcrumbMap: IBreadcrumbMap
) => {
  // 输入的地址
  const pathname = location.pathname;
  // 选中的菜单
  let selectedKey: string = "";
  // 展开的菜单项
  let openKeys: string[] = [];
  if (pathname === "/") {
    selectedKey = extractFilterRoutes[0].path;
  } else {
    // 当前选中的路由
    const selectedRoute = matchParamsPath(pathname, breadcrumbMap);
    if (selectedRoute) {
      selectedKey = selectedRoute.path;
    } else {
      selectedKey = "/404";
    }
  }
  openKeys = matchOpenKeys(selectedKey);
  return { selectedKey, openKeys };
};

/**
 * @description 提取嵌套路由，变为单层数组
 * @param routeList 路由配置
 * @param all 全部路由列表
 * @param filter 过滤的路由
 */
interface IExtractRouteReturn {
  all: IRoutes[];
  filter: IRoutes[];
  searchSidebar: IRoutes[];
}
export const extractRoute = (
  routeList: IRoutes[],
  all: IRoutes[],
  filter: IRoutes[],
  searchSidebar: IRoutes[]
): IExtractRouteReturn => {
  routeList.forEach(
    (route: IRoutes, index: number): void | IExtractRouteReturn => {
      if (route.routes && route.routes.length > 0) {
        all.push({
          ...route
        });
        return extractRoute(route.routes, all, filter, searchSidebar);
      } else {
        all.push({
          ...route
        });
        filter.push({
          ...route
        });
        if (!route.noSidebar) {
          searchSidebar.push({
            ...route
          });
        }
      }
    }
  );
  return { all, filter, searchSidebar };
};
