import { Breadcrumb } from "antd";
import * as React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { matchParamsPath } from "utils/sidebar";

class BreadcrumbWrapper extends React.Component<any> {
  // public shouldComponentUpdate(nextProps: any, nextState: any) {
  //   // 由于history.push会导致this.props.location改变两次，从而导致组件重新render两次，所以用以下方式来判断组件是否需要render
  //   return this.props.location.pathname !== nextProps.location.pathname;
  // }

  public render() {
    console.warn("Render BreadcrumbWrapper");
    const { pathname } = this.props.history.location;
    // 去掉pathname末尾的“／”
    const filterPathname = pathname.replace(/\/$/, "")
      ? pathname.replace(/\/$/, "")
      : "/";

    // 当前打开的路由
    const targetRoute = matchParamsPath(
      filterPathname,
      this.props.breadcrumbMap
    );

    if (!targetRoute) {
      return null;
    }

    const breadcrums = this.props.selectedKeys[0]
      .split("/")
      .filter((i: string) => i);

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
          const url = `/${breadcrums.slice(0, index + 1).join("/")}`;
          // 判断是否为当前路由
          if (filterPathname === url) {
            return false;
          }
          // 如果存在重定向则不需要link
          if (
            this.props.breadcrumbMap[url] &&
            this.props.breadcrumbMap[url].redirect
          ) {
            return (
              <Breadcrumb.Item key={index}>
                {this.props.breadcrumbMap[url].title}
              </Breadcrumb.Item>
            );
          }

          // 如果存在子route且length大于0
          if (
            this.props.breadcrumbMap[url].routes &&
            this.props.breadcrumbMap[url].routes.length > 0
          ) {
            return (
              <Breadcrumb.Item key={index}>
                {this.props.breadcrumbMap[url].title}
              </Breadcrumb.Item>
            );
          }
          return (
            <Breadcrumb.Item key={index}>
              <Link to={url}>{this.props.breadcrumbMap[url].title}</Link>
            </Breadcrumb.Item>
          );
        })}
        <Breadcrumb.Item>{targetRoute.title}</Breadcrumb.Item>
      </Breadcrumb>
    );
  }
}

function mapStateToProps(state: any, ownProps: any) {
  return {
    selectedKeys: state.app.selectedKeys,
    breadcrumbMap: state.app.breadcrumbMap
  };
}

export default connect(mapStateToProps)(BreadcrumbWrapper);
