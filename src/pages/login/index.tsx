import { Button } from "antd";
import * as React from "react";
import { connect } from "react-redux";
import { login } from "redux/actions/app";
import { getUserInfo } from "services/api";
import { setToken } from "utils/auth";

class Login extends React.PureComponent<any> {
  public login = () => {
    console.log(134);
    const config: any = {
      config: {}
    };
    getUserInfo(true).then((res: any) => {
      const { token, id, avatar, name } = res.data;
      const userInfo: any = {
        userInfo: {
          name,
          id,
          avatar
        }
      };
      let isLogin = false;
      if (res.code === 200) {
        isLogin = true;
        setToken(token);
      }
      this.props.login({ ...config, ...userInfo, ...{ isLogin } });
      window.location.href = "/";
    });
  };
  public render() {
    return (
      <Button onClick={this.login} type="primary">
        Primary
      </Button>
    );
  }
}

export default connect(
  null,
  { login }
)(Login);
