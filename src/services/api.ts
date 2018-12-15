import http from "utils/request";

export async function getUserInfo() {
  return http({
    url: "/getUserInfo",
    method: "post"
  });
}
