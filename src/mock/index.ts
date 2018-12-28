import Mock from "mockjs";

Mock.mock(/\/api\/getUserInfo/, ({ body }: any) => {
  if (body) {
    return {
      code: 200,
      data: {
        id: 1,
        name: "Super Admin"
      },
      message: "成功"
    };
  } else {
    return {
      code: 401,
      data: {},
      message: "未登录"
    };
  }
});

Mock.mock(/\/api\/login/, ({ body }: any) => {
  return {
    code: 200,
    data: {},
    message: "成功"
  };
});

export default Mock;
