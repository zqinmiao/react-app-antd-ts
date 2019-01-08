import { Layout } from "antd";
import ScrollToTop from "components/scroll-to-top";
import Exception from "pages/exception/index";
import login from "pages/login/index";
import * as React from "react";
import { connect } from "react-redux";
import {
  Redirect,
  Route,
  RouteComponentProps,
  Switch,
  withRouter
} from "react-router-dom";
import RouteWithSubRoutes from "src/router/route-with-sub-routes";
import { IRoutes, IStoreState } from "types/index";
import { matchParamsPath } from "utils/sidebar";
import HeaderTop from "./header/index";
import Sidebar from "./sidebar/index";

import "src/layouts/style.scss";

interface ILayoutsProps extends IStoreState, RouteComponentProps {}

const { Content } = Layout;
class Layouts extends React.PureComponent<ILayoutsProps> {
  public render() {
    let renderRoute = {};
    const { pathname } = this.props.location;
    // 判断是否登陆
    if (!this.props.isLogin) {
      renderRoute = (
        <Switch>
          <Route path="/login" component={login} />
          <Redirect to="/login" />
        </Switch>
      );
    } else {
      // 全部路由映射中是否存在(同时对params的path进行判断)
      const targetRoute = matchParamsPath(pathname, this.props.realRouteMap);
      if (targetRoute) {
        // 当前路由的地址数组
        const targetPaths = targetRoute.path
          .split("/")
          .filter((i: string) => i);

        // 存在组件的路由项
        const existComponent: IRoutes[] = [];
        targetPaths.forEach((key: string, index: number) => {
          const path = `/${targetPaths.slice(0, index + 1).join("/")}`;
          const route = this.props.breadcrumbMap[path];
          if (route && route.component) {
            existComponent.push(route);
          }
        });

        // 重新整理嵌套路由，将无组件的嵌套去除
        if (existComponent.length > 0) {
          const routeMap = existComponent.reduceRight(
            (obj: IRoutes, item: IRoutes, index: number) => {
              if (existComponent.length - 1 === index) {
                obj = item;
                return { ...obj };
              }
              return { ...item, ...{ routes: [obj] } };
            },
            {
              title: "",
              path: "",
              component: null
            }
          );
          renderRoute = <RouteWithSubRoutes {...routeMap} />;
        }
      } else {
        // 处理根域、login和404的情况
        if (/^\/login(\/?)$/.test(pathname)) {
          renderRoute = <Route path="/login" component={login} />;
        } else {
          if (pathname === "/") {
            renderRoute = (
              <Route
                exact={true}
                path="/"
                render={() => <Redirect to={this.props.firstLink} />}
              />
            );
          } else {
            renderRoute = (
              <Route
                exact={true}
                path="/"
                render={() => <Redirect to="/404" />}
              />
            );
          }
        }
      }
    }
    console.warn("Render Layout");
    return (
      <div
        className="app-wrapper"
        style={{
          height: "100%"
        }}
      >
        {this.props.isLogin && !/^\/login(\/?)$/.test(pathname) ? (
          <Layout className="layout-wrapper">
            <Sidebar {...this.props} />
            <Layout className="layout-box">
              <HeaderTop {...this.props} />
              <Content
                style={{
                  position: "absolute",
                  top: "64px",
                  right: 0,
                  left: 0,
                  bottom: 0
                }}
              >
                <div
                  className="main-wrapper"
                  style={{
                    position: "absolute",
                    padding: "10px",
                    top: 0,
                    right: 0,
                    left: 0,
                    bottom: 0,
                    background: "#f0f2f5",
                    overflow: "auto"
                  }}
                >
                  <div
                    style={{
                      padding: "15px",
                      minHeight: "100%",
                      background: "#fff"
                    }}
                  >
                    <ScrollToTop>
                      <Switch>
                        {renderRoute}
                        <Route
                          render={() => (
                            <Exception
                              title="404"
                              desc="抱歉，你访问的页面不存在"
                              showAction={true}
                            />
                          )}
                        />
                      </Switch>
                    </ScrollToTop>
                  </div>
                </div>
              </Content>
            </Layout>
          </Layout>
        ) : (
          <Layout className="layout-wrapper">{renderRoute}</Layout>
        )}
      </div>
    );
  }
}

function mapStateToProps({ app }: { app: IStoreState }) {
  return {
    isLogin: app.isLogin,
    firstLink: app.firstLink,
    userInfo: app.userInfo,
    routes: app.routes,
    extractAllRoutes: app.extractAllRoutes,
    extractFilterRoutes: app.extractFilterRoutes,
    searchSidebar: app.searchSidebar,
    breadcrumbMap: app.breadcrumbMap,
    realRouteMap: app.realRouteMap,
    collapsed: app.collapsed,
    selectedKeys: app.selectedKeys,
    openKeys: app.openKeys
  };
}

export default withRouter(connect(mapStateToProps)(Layouts));
