import http from "utils/request";

export async function getUserInfo(islogin: boolean) {
  return http.post("/api/getUserInfo", islogin);
}

export async function login(params: any) {
  return http.post("/api/login");
}
