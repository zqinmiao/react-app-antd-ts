import { Layout } from "antd";
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

function NoAuth() {
  return <h3>403</h3>;
}

function NotFound() {
  return <h3>404</h3>;
}

class Layouts extends React.PureComponent<any> {
  public render() {
    console.warn("Render Layout");
    const { pathname } = history.location;
    const filterPathname = pathname.replace(/\/$/, "")
      ? pathname.replace(/\/$/, "")
      : "/";
    console.log(filterPathname);

    // 查找path地址是否在路由表中
    const findPath = this.props.extractFilterRoutes.find((item: any) => {
      return item.path === filterPathname;
    });

    // 如果不存在，则去查找上层path是否存在
    if (!findPath) {
      // 过滤出每层path的数组
      const pathnameArr = filterPathname.split("/").filter(item => item);
      // 找到上一层path的地址
      const preIndex = pathnameArr.length - 2 > 0 ? pathnameArr.length - 2 : 0;
      const prePath = `/${pathnameArr[preIndex]}`;

      // 如果上层path存在且对应的路由存在redirect
      if (
        this.props.breadcrumbMap[prePath] &&
        this.props.breadcrumbMap[prePath].redirect
      ) {
        history.push(this.props.breadcrumbMap[prePath].redirect);
      } else if (filterPathname !== "/403" && filterPathname !== "/404") {
        history.push("/404");
      }
    }

    return (
      <Router>
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
                <Route exact={true} path="/403" component={NoAuth} />
                <Route exact={false} path="/404" component={NotFound} />
              </Switch>
            </Content>
          </Layout>
        </Layout>
      </Router>
    );
  }
}

function mapStateToProps(state: any, ownProps: any) {
  return {
    routes: state.app.routes,
    breadcrumbMap: state.app.breadcrumbMap,
    extractFilterRoutes: state.app.extractFilterRoutes
  };
}

export default connect(mapStateToProps)(Layouts);
