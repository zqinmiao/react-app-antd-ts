import { Icon, Layout, Menu } from "antd";
import * as React from "react";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import { toggleMenuOpen, toggleMenuSelect } from "redux/actions/app";
import SearchMenu from "./search-menu";

const { Sider } = Layout;
const { SubMenu } = Menu;

const initialState = {
  openKeys: "", // 展开的菜单
  selectedKey: "" // 选择的菜单
};
type State = Readonly<typeof initialState>;

class Sidebar extends React.Component<any, State> {
  public readonly state: State = initialState;
  public rootSubmenuKeys: string[] = [];

  /**
   * @description 组件将要挂载
   */
  public componentWillMount() {
    console.log("Sidebar componentWillMount", this.props);
    // 获取根Submenu的key
    this.rootSubmenuKeys = this.props.routes.map(
      (item: any, index: number) => `${item.path}`
    );
  }

  /**
   * @description 组件将要更新
   */
  public componentWillUpdate(nextProps: any, nextState: any) {
    console.log("Sidebar componentWillUpdate-props", this.props, nextProps);
  }

  // public shouldComponentUpdate(nextProps: any, nextState: any) {
  //   // 由于history.push会导致this.props改变，从而导致组件重新render，所以用以下方式来判断组件是否需要render
  //   return (
  //     this.state.openKeys !== nextState.openKeys ||
  //     this.state.selectedKey !== nextState.selectedKey ||
  //     this.props.collapsed !== nextProps.collapsed ||
  //     this.props.selectedKeys[0] !== nextProps.selectedKeys[0]
  //   );
  // }

  /**
   * @description 菜单项被选中时调用
   */
  public onSelect = ({ item, key, selectedKeys }: any) => {
    console.log("selectedMenu", item, key, selectedKeys);
    this.setState({ selectedKey: key, openKeys: "" });
    // 触发redux中方法派发
    this.props.toggleMenuSelect(selectedKeys);
  };

  /**
   * @description SubMenu 展开/关闭的回调
   */
  public onOpenChange = (openKeys: string[]) => {
    let resultOpenKeys = [];

    console.log("onOpenChange", openKeys);
    // 判断菜单栏折叠后鼠标hover是否移出菜单，若移出：openKeys为空数组
    if (openKeys.length > 0) {
      // 只有一个子菜单展开
      const latestOpenKey: any = openKeys.find(
        (key: string) => this.props.openKeys.indexOf(key) === -1
      );

      if (this.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
        resultOpenKeys = openKeys;
      } else {
        resultOpenKeys = latestOpenKey ? [latestOpenKey] : [];
      }
    } else {
      resultOpenKeys = [""];
    }

    // 派发redux
    this.props.toggleMenuOpen(resultOpenKeys);
    // 更新state
    const openKeysStr = resultOpenKeys.join();
    this.setState({ openKeys: openKeysStr });
  };

  public render() {
    console.warn("Render Sidebar");
    return (
      <Sider
        className={"sidebar-wrapper"}
        trigger={null}
        collapsible={true}
        collapsed={this.props.collapsed}
      >
        {this.props.collapsed ? null : <SearchMenu />}
        <Menu
          key="Menu"
          onSelect={this.onSelect}
          onOpenChange={this.onOpenChange}
          theme="dark"
          mode={this.props.collapsed ? "vertical" : "inline"}
          openKeys={this.props.openKeys}
          selectedKeys={this.props.selectedKeys}
        >
          {this.props.routes.map((ele: any, index: number) => {
            if (!ele.routes) {
              return (
                <Menu.Item key={`${ele.path}`}>
                  <span>
                    <Icon type={ele.icon} />
                    {this.props.collapsed ? "" : ele.title}
                  </span>
                  <Link to={ele.path}>{ele.title}</Link>
                </Menu.Item>
              );
            }
            // 如果存在重定向
            if (ele.redirect) {
              const redirect = ele.routes.find((item: any) => {
                return item.path === ele.redirect;
              });
              return (
                <SubMenu
                  key={`${ele.path}`}
                  title={
                    <span>
                      <Icon type={ele.icon} />
                      {this.props.collapsed ? "" : ele.title}
                    </span>
                  }
                >
                  <Menu.Item key={`${redirect.path}`}>
                    <span>
                      <Icon type={redirect.icon} />
                    </span>
                    <Link to={redirect.path}>{redirect.title}</Link>
                  </Menu.Item>
                </SubMenu>
              );
            }
            return (
              <SubMenu
                key={`${ele.path}`}
                title={
                  <span>
                    <Icon type={ele.icon} />
                    {this.props.collapsed ? "" : ele.title}
                  </span>
                }
              >
                {ele.routes.map((sele: any, sindex: number) => {
                  let subMenu;
                  if (sele.redirect) {
                    const redirect = sele.routes.find((item: any) => {
                      return item.path === sele.redirect;
                    });
                    subMenu = (
                      <SubMenu
                        key={`${sele.path}`}
                        title={
                          <span>
                            <Icon type={sele.icon} />
                            {sele.title}
                          </span>
                        }
                      >
                        <Menu.Item key={`${redirect.path}`}>
                          <Link to={redirect.path}>{redirect.title}</Link>
                        </Menu.Item>
                      </SubMenu>
                    );
                  } else {
                    if (sele.routes && sele.routes.length) {
                      subMenu = (
                        <SubMenu
                          key={`${sele.path}`}
                          title={
                            <span>
                              <Icon type={sele.icon} />
                              {sele.title}
                            </span>
                          }
                        >
                          {sele.routes.map((mele: any, mindex: number) => {
                            return (
                              <Menu.Item key={`${mele.path}`}>
                                <Link to={mele.path}>{mele.title}</Link>
                              </Menu.Item>
                            );
                          })}
                        </SubMenu>
                      );
                    } else {
                      subMenu = (
                        <Menu.Item key={`${sele.path}`}>
                          <span>
                            <Icon type={sele.icon} />
                            {sele.title}
                          </span>
                          <Link to={sele.path}>{sele.title}</Link>
                        </Menu.Item>
                      );
                    }
                  }

                  return subMenu;
                })}
              </SubMenu>
            );
          })}
        </Menu>
      </Sider>
    );
  }
}

function mapStateToProps(state: any, ownProps: any) {
  console.log("Sidebar mapStateToProps", state);
  // return出去的值即可映射到组件的props上
  return {
    collapsed: state.app.collapsed,
    selectedKeys: state.app.selectedKeys,
    openKeys: state.app.openKeys,
    routes: state.app.routes
  };
}

export default withRouter(
  connect(
    mapStateToProps,
    { toggleMenuSelect, toggleMenuOpen }
  )(Sidebar)
);
