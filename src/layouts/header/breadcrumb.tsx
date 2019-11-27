import { Breadcrumb } from "antd";
import pathToRegexp from "path-to-regexp";
import * as React from "react";
import { Link } from "react-router-dom";
import { matchParamsPath } from "utils/sidebar";

class BreadcrumbWrapper extends React.PureComponent<any> {
  public render() {
    console.warn("Render BreadcrumbWrapper");
    const { pathname } = this.props.location;

    // 当前打开的路由
    const targetRoute = matchParamsPath(pathname, this.props.realRouteMap);

    if (!targetRoute) {
      return null;
    }
    const breadcrums = targetRoute.path.split("/").filter((i: string) => i);

    return (
      <Breadcrumb
        style={{
          position: "relative",
          top: "-2px",
          float: "left",
          lineHeight: "64px"
        }}
      >
        {breadcrums.map((item: string, index: number) => {
          const path = `/${breadcrums.slice(0, index + 1).join("/")}`;
          // 判断是否为当前路由
          if (pathToRegexp(path).test(pathname)) {
            return false;
          }

          // 如果存在子route且length大于0
          if (this.props.breadcrumbMap[path].routes) {
            return (
              <Breadcrumb.Item key={index}>
                {this.props.breadcrumbMap[path].title}
              </Breadcrumb.Item>
            );
          }
          return (
            <Breadcrumb.Item key={index}>
              {
                this.props.breadcrumbMap[path].children ? 
                this.props.breadcrumbMap[path].title :
                <Link to={path}>{this.props.breadcrumbMap[path].title}</Link>
              }
            </Breadcrumb.Item>
          );
        })}
        <Breadcrumb.Item>{targetRoute.title}</Breadcrumb.Item>
      </Breadcrumb>
    );
  }
}

export default BreadcrumbWrapper;
