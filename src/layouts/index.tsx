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
import { IRoutes, IStoreState, IRouteMap } from "types/index";
import { matchParamsPath } from "utils/sidebar";
import Header from "./header";
import Sidebar from "./sidebar/index";

import "src/layouts/style.scss";

interface IProps extends RouteComponentProps {
  isLogin: boolean;
  firstLink: string;
  realRouteMap: IRouteMap;
  breadcrumbMap: IRouteMap;
}

const { Content } = Layout;
class Layouts extends React.PureComponent<IProps> {
  public generateRoute() {
    let renderRoute = null;
    const {
      location: { pathname },
      isLogin,
      realRouteMap,
      breadcrumbMap,
      firstLink
    } = this.props;

    // 判断是否登陆
    if (isLogin) {
      // 全部路由映射中是否存在(同时对params的path进行判断)
      const targetRoute = matchParamsPath(pathname, realRouteMap);
      if (targetRoute) {
        // 当前路由的地址数组
        const targetPaths = targetRoute.path
          .split("/")
          .filter((i: string) => i);

        // 存在组件的路由项
        const existComponent: IRoutes[] = [];
        targetPaths.forEach((key: string, index: number) => {
          const path = `/${targetPaths.slice(0, index + 1).join("/")}`;
          const route = breadcrumbMap[path];
          if (route && route.component) {
            existComponent.push(route);
          }
        });

        if (existComponent.length > 0) {
          renderRoute = existComponent.map((route) => <RouteWithSubRoutes key={route.path} {...route} />);
        }
      } else {
        // 处理根域、login情况
        if (/^\/login(\/?)$/.test(pathname)) {
          renderRoute = <Route path="/login" component={login} />;
        } else {
          if (pathname === "/") {
            renderRoute = <Redirect to={firstLink} />;
          }
        }
      }
    }
    return renderRoute;
  }

  public render() {
    console.warn("Render Layout");
    return (
      <div className="layout-wrapper">
        {this.props.isLogin ? (
          <Layout className="layout-wrapper__inner">
            <Sidebar />
            <Layout className="layout-wrapper__inner-left">
              <Header {...this.props} />
              <Content className="layout-wrapper__inner-left_content">
                <ScrollToTop>
                  <Switch>
                    {this.generateRoute()}
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
              </Content>
            </Layout>
          </Layout>
        ) : (
          <Switch>
            <Route path="/login" component={login} />
            <Redirect to="/login" />
          </Switch>
        )}
      </div>
    );
  }
}

function mapStateToProps({ app }: { app: IStoreState }) {
  return {
    isLogin: app.isLogin,
    firstLink: app.firstLink,
    realRouteMap: app.realRouteMap,
    breadcrumbMap: app.breadcrumbMap
  };
}

export default withRouter(connect(mapStateToProps)(Layouts));
