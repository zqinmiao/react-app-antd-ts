import Cookies from "js-cookie";

const TokenKey = "adminToken";

export function getToken() {
  return Cookies.get(TokenKey);
}

export function setToken(token: string) {
  const expires = new Date(new Date().getTime() + 3 * 60 * 60 * 1000);
  return Cookies.set(TokenKey, token, { expires });
}

export function removeToken() {
  return Cookies.remove(TokenKey);
}

/**
 * 存储localStorage
 */
export const setStore = (name: string, content: any) => {
  if (!name) { return; }
  if (typeof content !== 'string') {
      content = JSON.stringify(content);
  }
  window.localStorage.setItem(name, content);
};

/**
 * 获取localStorage
 */
export const getStore = (name: string) => {
  if (!name) { return; }
  return window.localStorage.getItem(name);
}

/**
 * 删除localStorage
 */
export const removeStore = (name: string) => {
  if (!name) { return; }
  window.localStorage.removeItem(name);
}

/**
 * 清除localStorage
 */
export const clearStore = () => {
  window.localStorage.clear();
};