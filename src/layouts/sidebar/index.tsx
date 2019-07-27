import { Icon, Layout, Menu } from "antd";
import * as React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { toggleMenuOpen, toggleMenuSelect } from "redux/actions/app";
import { IRoutes, IStoreState } from "types/index";
// import SearchMenu from "./search-menu";
import SidebarLogo from "./sidebar-logo";
import "./style.scss";

const { Sider } = Layout;
const { SubMenu } = Menu;

const initialState = {
  openKeys: "", // 展开的菜单
  selectedKey: "" // 选择的菜单
};
type State = Readonly<typeof initialState>;

interface IProps {
  openKeys: string[];
  routes: IRoutes[];
  collapsed: boolean;
  selectedKeys: string[];
  toggleMenuOpen(openKeys: string[]): any;
  toggleMenuSelect(selectedKeys: string[]): any;
}

class Sidebar extends React.PureComponent<IProps, State> {
  public readonly state: State = initialState;
  public rootSubmenuKeys: string[] = [];

  constructor(props: IProps) {
    super(props);
  // 获取根Submenu的key
    this.rootSubmenuKeys = this.props.routes.map(
      (item: IRoutes, index: number) => `${item.path}`
    );
  }

  /**
   * 此生命周期在React v16.3.0版本后将废弃componentWillMount、componentWillReceiveProps 以及 componentWillUpdate 三个周期函数
   * @description 组件将要挂载
   */
  // public componentWillMount() {
  //   console.log("Sidebar componentWillMount", this.props);
    
  // }

  /**
   * 此生命周期在React v16.3.0版本后将废弃componentWillMount、componentWillReceiveProps 以及 componentWillUpdate 三个周期函数
   * @description 组件将要更新
   */
  // public componentWillUpdate(nextProps: any, nextState: State) {
  //   console.log("Sidebar componentWillUpdate-props", this.props, nextProps);
  // }

  /**
   * @description 菜单项被选中时调用
   */
  public onSelect = ({
    key,
    selectedKeys
  }: {
    key: string;
    selectedKeys: string[];
  }) => {
    this.setState({ selectedKey: key, openKeys: "" });
    // 触发redux中方法派发
    this.props.toggleMenuSelect(selectedKeys);
  };

  /**
   * @description SubMenu 展开/关闭的回调
   */
  public onOpenChange = (openKeys: string[]) => {
    let resultOpenKeys: string[] = [];
    console.log(this.rootSubmenuKeys);

    // 判断菜单栏折叠后鼠标hover是否移出菜单，若移出：openKeys为空数组
    if (openKeys.length > 0) {
      // 只有一个子菜单展开
      const latestOpenKey: string | undefined = openKeys.find(
        (key: string) => this.props.openKeys.indexOf(key) === -1
      );
      if (this.rootSubmenuKeys.indexOf(`${latestOpenKey}`) === -1) {
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
        <SidebarLogo />
        {/* {this.props.collapsed ? null : <SearchMenu {...this.props} />} */}
        <Menu
          className="sidebar-menu"
          key="Menu"
          onSelect={this.onSelect}
          onOpenChange={this.onOpenChange}
          theme="dark"
          mode={this.props.collapsed ? "vertical" : "inline"}
          openKeys={this.props.openKeys}
          selectedKeys={this.props.selectedKeys}
        >
          {this.props.routes.map((ele: IRoutes, index: number) => {
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
                {ele.routes.map((sele: IRoutes, sindex: number) => {
                  let subMenu;
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
                        {sele.routes.map((mele: IRoutes, mindex: number) => {
                          return mele.noSidebar ? null : (
                            <Menu.Item key={`${mele.path}`}>
                              <Link to={mele.path}>{mele.title}</Link>
                            </Menu.Item>
                          );
                        })}
                      </SubMenu>
                    );
                  } else {
                    if (!sele.noSidebar) {
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

function mapStateToProps({ app }: { app: IStoreState }) {
  return {
    openKeys: app.openKeys,
    routes: app.routes,
    selectedKeys: app.selectedKeys,
    collapsed: app.collapsed
  };
}

export default connect(
  mapStateToProps,
  { toggleMenuSelect, toggleMenuOpen }
)(Sidebar);
