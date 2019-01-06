import Mock from "mockjs";

interface IBody<T> {
  [propName: string]: T;
}

Mock.mock(/\/api\/getUserInfo/, <T>({ body }: IBody<T>) => {
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

Mock.mock(/\/api\/login/, <T>({ body }: IBody<T>) => {
  return {
    code: 0,
    result: {},
    message: "成功"
  };
});

export default Mock;
