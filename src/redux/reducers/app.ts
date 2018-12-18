import { getMenuSelectedAndOpenKeys, matchOpenKeys } from "utils/sidebar";

// 初始化state
const initialState: any = {
  isLogin: false, // 是否登陆
  config: null, // 配置信息
  userInfo: null, // 用户信息
  routes: [], // 路由列表
  extractAllRoutes: [], // 单层全部路由列表
  extractFilterRoutes: [], // 单层过滤后的路由列表
  breadcrumbMap: null,
  collapsed: false, // 侧边栏是否折叠
  selectedKeys: [], // 菜单选中
  openKeys: "" // 菜单展开项
};

export default function(state = initialState, action: any) {
  switch (action.type) {
    // 初始化 state
    case "INIT_STATE": {
      const {
        isLogin,
        routes,
        extractAllRoutes,
        extractFilterRoutes,
        breadcrumbMap,
        selectedKeys,
        openKeys
      } = action.payload;
      return {
        ...state,
        isLogin,
        routes,
        extractAllRoutes,
        extractFilterRoutes,
        breadcrumbMap,
        selectedKeys,
        openKeys
      };
    }

    // 设置base config
    case "SET_BASE_CONFIG": {
      const { config, userInfo, isLogin } = action.payload;
      return {
        ...state,
        config,
        userInfo,
        isLogin
      };
    }

    // 触发侧边栏折叠动作
    case "TOGGLE_COLLAPSED": {
      const { collapsed } = action.payload;
      // 如果侧边栏展开
      if (!collapsed) {
        const { selectedKey, openKeys } = getMenuSelectedAndOpenKeys(
          state.extractFilterRoutes,
          state.breadcrumbMap
        );
        return {
          ...state,
          collapsed,
          selectedKeys: [selectedKey],
          openKeys
        };
      }
      return {
        ...state,
        collapsed,
        openKeys: [""]
      };
    }

    // 触发菜单选择
    case "TOGGLE_MENU_SELECT": {
      const { selectedKeys } = action.payload;
      const openKeys = matchOpenKeys(selectedKeys[0]);
      return {
        ...state,
        selectedKeys,
        openKeys
      };
    }

    // 触发菜单展开
    case "TOGGLE_MENU_OPEN": {
      const { openKeys } = action.payload;
      console.log("TOGGLE_MENU_OPEN", openKeys);
      return {
        ...state,
        openKeys
      };
    }
    default:
      return state;
  }
}
