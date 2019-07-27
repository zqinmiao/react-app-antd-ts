import { Avatar, Dropdown, Icon, Layout, Menu, Modal } from "antd";
import * as React from "react";
import { connect } from "react-redux";
import { toggleCollapseds } from "redux/actions/app";
import { IRoutes, IStoreState } from "types/index";
import { removeToken } from "utils/auth";
import Breadcrumb from "./breadcrumb";
import "./style.scss";

const { Header } = Layout;
const confirm = Modal.confirm;

const logout = () => {
  confirm({
    title: "确定登出？",
    content: "",
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
};

const menu = (
  <Menu onClick={logout}>
    <Menu.Item key="0">退出登录</Menu.Item>
  </Menu>
);

interface IProps {
  collapsed: boolean;
  userInfo: any;
  toggleCollapseds(collapsed: boolean): any;
}

class HeaderWrapper extends React.PureComponent<IProps> {
  // 控制sidebar展开收缩
  public toggleCollapseds = () => {
    this.props.toggleCollapseds(!this.props.collapsed);
  };

  public render() {
    console.warn("Render HeaderTop");
    return (
      <Header
        className="header-top-wrapper"
        style={{
          background: "#fff",
          padding: 0,
          borderBottom: "1px solid #e6e6e6"
        }}>
        <div className="clearfix">
          <Icon
            className="trigger"
            type={this.props.collapsed ? "menu-unfold" : "menu-fold"}
            onClick={this.toggleCollapseds}
          />
          <Breadcrumb {...this.props} />
          <Dropdown className="dropdown" overlay={menu} trigger={["click"]}>
            <span className="ant-dropdown-link" style={{ cursor: "pointer" }}>
              <Avatar
                size="small"
                style={{ marginRight: "10px", backgroundColor: "#40a9ff" }}
                icon="user"
              />
              {this.props.userInfo.name}
              <Icon style={{ marginLeft: "10px" }} type="down" />
            </span>
          </Dropdown>
        </div>
      </Header>
    );
  }
}

export default connect(
  ({ app }: { app: IStoreState }) => {
    return {
      userInfo: app.userInfo,
      collapsed: app.collapsed
    };
  },
  { toggleCollapseds }
)(HeaderWrapper);
