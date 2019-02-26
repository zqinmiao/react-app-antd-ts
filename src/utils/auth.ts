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
