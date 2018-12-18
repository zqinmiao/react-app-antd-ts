import Mock from "mockjs";

Mock.mock(/\/api\/login/, ({ body }: any) => {
  if (body) {
    return {
      code: 200,
      data: {
        id: 113,
        token: "admin",
        avatar:
          "https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif",
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

export default Mock;
