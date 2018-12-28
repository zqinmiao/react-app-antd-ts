import { Layout } from "antd";
import ScrollToTop from "components/scroll-to-top";
import NotFind from "pages/exception/index";
import login from "pages/login/index";
import pathToRegexp from "path-to-regexp";
import * as React from "react";
import { connect } from "react-redux";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch
} from "react-router-dom";
import RouteWithSubRoutes from "src/router/route-with-sub-routes";
import { matchParamsPath } from "utils/sidebar";
import HeaderTop from "./header/index";
import Sidebar from "./sidebar/index";

import { createBrowserHistory } from "history";

const history = createBrowserHistory();

import "src/layouts/style.scss";

const { Content } = Layout;

class Layouts extends React.PureComponent<any> {
  public matchParamsPath = (pathname: string, breadcrumbMap: any) => {
    const pathKey: any = Object.keys(breadcrumbMap).find(key =>
      pathToRegexp(key).test(pathname)
    );
    return breadcrumbMap[pathKey];
  };
  public render() {
    let routerComponent = null;
    let filterPathname = "";
    const { pathname } = history.location;
    filterPathname = pathname.replace(/\/$/, "")
      ? pathname.replace(/\/$/, "")
      : "/";
    // 判断是否登陆
    if (!this.props.isLogin) {
      routerComponent = (
        <Switch>
          <Route path="/login" component={login} />
          <Redirect to="/login" />
        </Switch>
      );
    } else {
      // 查找path地址是否在路由表中
      const findPath = this.props.extractFilterRoutes.find((item: any) => {
        return item.path === filterPathname;
      });

      // 如果未找到且全部路由映射存在
      if (!findPath) {
        if (
          this.props.breadcrumbMap[filterPathname] &&
          this.props.breadcrumbMap[filterPathname].redirect
        ) {
          routerComponent = (
            <Redirect to={this.props.breadcrumbMap[filterPathname].redirect} />
          );
        } else {
          // 全部路由映射中是否存在(同时对params的path进行判断)
          const paramsPath = matchParamsPath(
            filterPathname,
            this.props.breadcrumbMap
          );
          if (!paramsPath) {
            if (filterPathname === "/login") {
              routerComponent = <Route path="/login" component={login} />;
            } else {
              if (filterPathname === "/") {
                routerComponent = (
                  <Route
                    exact={true}
                    path="/"
                    render={() => <Redirect to={this.props.firstLink} />}
                  />
                );
              } else {
                if (filterPathname !== "/404") {
                  history.replace("/404");
                }
              }
            }
          }
        }
      }
    }
    console.warn("Render Layout");
    return (
      <Router>
        {this.props.isLogin && filterPathname !== "/login" ? (
          <Layout className="layout-wrapper">
            <Sidebar />
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
                        {this.props.routes.map((route: any, i: number) => {
                          return <RouteWithSubRoutes key={i} {...route} />;
                        })}
                        {routerComponent}
                        <Route component={NotFind} />
                      </Switch>
                    </ScrollToTop>
                  </div>
                </div>
              </Content>
            </Layout>
          </Layout>
        ) : (
          <Layout className="layout-wrapper">{routerComponent}</Layout>
        )}
      </Router>
    );
  }
}

function mapStateToProps(state: any, ownProps: any) {
  return {
    isLogin: state.app.isLogin,
    firstLink: state.app.firstLink,
    routes: state.app.routes,
    breadcrumbMap: state.app.breadcrumbMap,
    extractFilterRoutes: state.app.extractFilterRoutes
  };
}

export default connect(mapStateToProps)(Layouts);
