import http from "utils/request";

interface ILogin {
  name: string;
  password: string;
  validateCode: string;
}

export async function getUserInfo(islogin: boolean) {
  return http.post("/api/getUserInfo", islogin);
}

export async function login(params: ILogin) {
  return http.post("/api/login");
}
