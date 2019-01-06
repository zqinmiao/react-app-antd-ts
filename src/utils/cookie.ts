/*
 * @description: cookies操作
 * @Author: mark.zhang
 * @Date: 2018-11-15 17:51:02
 * @Last Modified by:   mark.zhang
 */

import Cookies from "js-cookie";

export const setCookie = (key: string, value: string): void =>
  Cookies.set(key, value);

export const getCookie = (key: string) => Cookies.get(key);

export const removeCookie = (key: string) => Cookies.remove(key);
