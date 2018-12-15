import { Dropdown, Icon, Layout, Menu } from "antd";
import * as React from "react";
import { connect } from "react-redux";
import { toggleCollapseds } from "redux/actions/app";
import BreadcrumbWrapper from "./breadcrumb";

const { Header } = Layout;

const menu = (
  <Menu>
    <Menu.Item key="0">退出登录</Menu.Item>
  </Menu>
);

class HeaderTop extends React.PureComponent<any> {
  // 控制sidebar展开收缩
  public toggleCollapseds = () => {
    this.props.toggleCollapseds(!this.props.collapsed);
  };

  public render() {
    console.warn("Render HeaderTop");
    return (
      <Header
        className="header-top-wrapper"
        style={{ background: "#fff", padding: 0 }}
      >
        <div className="clearfix">
          <Icon
            className="trigger"
            type={this.props.collapsed ? "menu-unfold" : "menu-fold"}
            onClick={this.toggleCollapseds}
          />
          <BreadcrumbWrapper {...this.props} />
          <Dropdown className="dropdown" overlay={menu} trigger={["click"]}>
            <span className="ant-dropdown-link" style={{ cursor: "pointer" }}>
              {`${this.props.admin.admin_name_cn}（${
                this.props.admin.admin_id
              }）`}
              <Icon type="down" />
            </span>
          </Dropdown>
        </div>
      </Header>
    );
  }
}

function mapStateToProps(state: any, ownProps: any) {
  return { collapsed: state.app.collapsed, admin: state.app.admin };
}

export default connect(
  mapStateToProps,
  { toggleCollapseds }
)(HeaderTop);
