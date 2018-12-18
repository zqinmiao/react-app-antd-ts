import http from "utils/request";

export async function getUserInfo(islogin: boolean) {
  return http.post("/login", islogin);
}
