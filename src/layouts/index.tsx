import { Layout } from "antd";
import login from "pages/login/index";
import * as React from "react";
import { connect } from "react-redux";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import RouteWithSubRoutes from "src/router/route-with-sub-routes";
import HeaderTop from "./header/index";
import Sidebar from "./sidebar/index";

import { createBrowserHistory } from "history";

const history = createBrowserHistory();

import "src/layouts/style.scss";

const { Content } = Layout;

function NotFound() {
  return <h3>404</h3>;
}

class Layouts extends React.PureComponent<any> {
  public render() {
    let filterPathname = "";
    // 判断是否登陆
    if (!this.props.isLogin) {
      history.replace("/login");
    } else {
      const { pathname } = history.location;
      filterPathname = pathname.replace(/\/$/, "")
        ? pathname.replace(/\/$/, "")
        : "/";
      console.log(filterPathname);

      // 查找path地址是否在路由表中
      const findPath = this.props.extractFilterRoutes.find((item: any) => {
        return item.path === filterPathname;
      });

      // 如果未找到且全部路由映射存在
      if (
        !findPath &&
        this.props.breadcrumbMap[filterPathname] &&
        this.props.breadcrumbMap[filterPathname].redirect
      ) {
        history.push(this.props.breadcrumbMap[filterPathname].redirect);
      } else if (
        !this.props.breadcrumbMap[filterPathname] &&
        filterPathname !== "/login"
      ) {
        // 如果不存在全部路由映射中，则说明无此路由，则跳转到404
        history.replace("/404");
      }
    }
    console.warn("Render Layout");
    console.log(this.props.isLogin);

    return (
      <Router>
        {this.props.isLogin && filterPathname !== "/login" ? (
          <Layout className="layout-wrapper">
            <Sidebar />
            <Layout>
              <HeaderTop {...this.props} />
              <Content
                style={{
                  margin: "10px 10px",
                  padding: 15,
                  background: "#fff",
                  height: "100%"
                }}
              >
                <Switch>
                  {this.props.routes.map((route: any, i: number) => {
                    console.log("Switch-routes-map");
                    return <RouteWithSubRoutes key={i} {...route} />;
                  })}
                  <Route component={NotFound} />
                </Switch>
              </Content>
            </Layout>
          </Layout>
        ) : (
          <Layout className="layout-wrapper">
            <Route path="/login" component={login} />
          </Layout>
        )}
      </Router>
    );
  }
}

function mapStateToProps(state: any, ownProps: any) {
  console.log(state);
  return {
    isLogin: state.app.isLogin,
    routes: state.app.routes,
    breadcrumbMap: state.app.breadcrumbMap,
    extractFilterRoutes: state.app.extractFilterRoutes
  };
}

export default connect(mapStateToProps)(Layouts);
