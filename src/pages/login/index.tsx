import { Button, Col, Form, Icon, Input } from "antd";
import * as React from "react";
import Particles from "react-particles-js";
import { login } from "services/api";
import logo from "src/assets/logo.svg";
import { setToken } from "utils/auth";
import "./style.scss";

const FormItem = Form.Item;

class Login extends React.PureComponent<any> {
  public state = {
    loading: false,
    validateCode: "",
    userNameFeedback: false,
    passwordFeedback: false,
    validateCodeFeedback: false
  };

  // 提交
  public handleSubmit = (e: any) => {
    e.preventDefault();
    this.props.form.validateFields(
      (err: any, { userName, password, validateCode }: any) => {
        this.setState({
          userNameFeedback: !userName,
          passwordFeedback: !password,
          validateCodeFeedback: !validateCode
        });
        if (!err) {
          this.setState({
            loading: true
          });
          login({
            name: userName,
            password,
            validateCode
          })
            .then((res: any) => {
              this.setState({
                loading: false
              });
              if (res.code === 200) {
                setToken("token");
                window.location.href = "/";
              } else {
                this.refresh();
              }
            })
            .catch(() => {
              this.setState({
                loading: false
              });
            });
        }
      }
    );
  };

  // 刷新验证码
  public refresh = () => {
    this.setState({
      validateCode: `getValidateCode?${+new Date()}`
    });
  };
  public render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div className="login-wrapper">
        <Particles
          params={{
            particles: {
              color: {
                value: "#303133"
              },
              line_linked: {
                enable: true,
                distance: 150,
                color: "#303133",
                opacity: 0.4,
                width: 1
              }
            }
          }}
          style={{ position: "absolute" }}
        />
        <div className="login-top">
          <div className="login-top_logo">
            <img src={logo} className="logo" alt="logo" />
          </div>
          <h3 className="login-top_des">个人管理</h3>
        </div>
        <Form onSubmit={this.handleSubmit} className="login-form">
          <FormItem>
            {getFieldDecorator("userName", {
              rules: [{ required: true, message: "用户名不能为空" }]
            })(
              <Input prefix={<Icon type="user" />} placeholder="请输入用户名" />
            )}
          </FormItem>
          <FormItem>
            {getFieldDecorator("password", {
              rules: [{ required: true, message: "密码不能为空" }]
            })(
              <Input
                prefix={<Icon type="lock" />}
                type="password"
                placeholder="请输入密码"
              />
            )}
          </FormItem>
          <FormItem>
            <Col span={17}>
              <FormItem>
                {getFieldDecorator("validateCode", {
                  rules: [{ required: true, message: "验证码不能为空" }]
                })(<Input placeholder="请输入右侧验证码" />)}
              </FormItem>
            </Col>
            <Col span={6} offset={1}>
              <img
                onClick={this.refresh}
                style={{ width: "100%", cursor: "pointer" }}
                src={this.state.validateCode}
                alt="验证码"
              />
            </Col>
          </FormItem>
          <FormItem className="login-form-item-button">
            <Button
              loading={this.state.loading}
              type="primary"
              htmlType="submit"
              className="login-form-button"
            >
              登 录
            </Button>
          </FormItem>
        </Form>
      </div>
    );
  }
}

export default Form.create()(Login);
