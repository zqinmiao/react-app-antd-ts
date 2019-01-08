import { message, Modal, notification } from "antd";
import axios from "axios";
import { getToken, removeToken } from "utils/auth";

const confirm = Modal.confirm;

const codeMessage = {
  200: "服务器成功返回请求的数据。",
  201: "新建或修改数据成功。",
  202: "一个请求已经进入后台排队（异步任务）。",
  204: "删除数据成功。",
  400: "发出的请求有错误，服务器没有进行新建或修改数据的操作。",
  401: "用户没有权限（令牌、用户名、密码错误）。",
  403: "用户得到授权，但是访问是被禁止的。",
  404: "发出的请求针对的是不存在的记录，服务器没有进行操作。",
  406: "请求的格式不可得。",
  410: "请求的资源被永久删除，且不会再得到的。",
  422: "当创建一个对象时，发生一个验证错误。",
  500: "服务器发生错误，请检查服务器。",
  502: "网关错误。",
  503: "服务不可用，服务器暂时过载或维护。",
  504: "网关超时。"
};

// create an axios instance
const service = axios.create({
  baseURL: "", // 请求的base_url
  timeout: 30000 // request timeout
});

// request interceptor
service.interceptors.request.use(
  config => {
    config.headers.Authorized = getToken();
    return config;
  },
  error => {
    message.error("请求出错");
    Promise.reject(error);
  }
);

// response interceptor
service.interceptors.response.use(
  response => {
    const { status, data, statusText } = response;

    if (status !== 200) {
      // 50008:非法的token; 50012:其他客户端登录了;  50014:Token 过期了;
      if (status === 50008 || status === 50012 || status === 50014) {
        // antd confirm
        confirm({
          title: "确定登出？",
          content: "你已被登出，请点击确认重新登录",
          okText: "确认",
          cancelText: "取消",
          onOk() {
            removeToken();
            window.location.reload();
          },
          onCancel() {
            console.log("取消");
          }
        });
      }
      const errortext = codeMessage[status] || statusText;
      notification.error({
        message: `请求错误 ${status}`,
        description: errortext
      });
      return Promise.reject(response);
    } else {
      if (data && data.code === 0) {
        return Promise.resolve(response);
      } else {
        message.error(data.message);
        return Promise.reject(response);
      }
    }
  },
  error => {
    message.error(error.message);
    return Promise.reject(error);
  }
);

export default service;
