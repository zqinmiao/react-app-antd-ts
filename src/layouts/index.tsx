import { Layout } from "antd";
import * as React from "react";
import { connect } from "react-redux";
import { Redirect, Route, Switch, withRouter } from "react-router-dom";
import RouteWithSubRoutes from "src/router/route-with-sub-routes";
import HeaderTop from "./header/index";
import Sidebar from "./sidebar/index";

import "src/layouts/style.scss";

const { Content } = Layout;

function No() {
  return <h3>no</h3>;
}

class Layouts extends React.PureComponent<any> {
  public render() {
    console.warn("Render Layout");
    const { pathname } = this.props.history.location;
    const filterPathname = pathname.replace(/\/$/, "");
    return (
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
                if (route.redirect && filterPathname === route.path) {
                  return <Redirect to={route.redirect} />;
                }
                return <RouteWithSubRoutes key={i} {...route} />;
              })}
              <Route to="/505" component={No} />
            </Switch>
          </Content>
        </Layout>
      </Layout>
    );
  }
}

function mapStateToProps(state: any, ownProps: any) {
  return {
    routes: state.app.routes
  };
}

export default withRouter(connect(mapStateToProps)(Layouts));
