// 触发折叠
export const toggleCollapseds = (collapsed: boolean) => ({
  type: "TOGGLE_COLLAPSED",
  payload: { collapsed }
});

// 触发menu的选择
export const toggleMenuSelect = (selectedKeys: string[]) => ({
  type: "TOGGLE_MENU_SELECT",
  payload: { selectedKeys }
});

// 触发菜单展开
export const toggleMenuOpen = (openKeys: string[]) => ({
  type: "TOGGLE_MENU_OPEN",
  payload: { openKeys }
});

// login
export const login = ({ config, userInfo, isLogin }: any) => ({
  type: "SET_BASE_CONFIG",
  payload: { config, userInfo, isLogin }
});
