import Mock from "mockjs";

Mock.mock(/\/api\/getUserInfo/, ({ body }) => {
  if (body) {
    return {
      code: 0,
      result: {
        id: 1,
        name: "Super Admin"
      },
      message: "成功"
    };
  } else {
    return {
      code: 401,
      message: "未登录"
    };
  }
});

Mock.mock(/\/api\/login/, () => {
  return {
    code: 0,
    result: {},
    message: "成功"
  };
});

export default Mock;
