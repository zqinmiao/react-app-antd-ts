/**
 * 嵌套路由的容器
 */
import * as React from "react";
import RouteWithSubRoutes from "src/router/route-with-sub-routes";
import { IMatch, IRoutes } from "types/index";

const Wrapper = ({ match, children }: { match: IMatch; children: IRoutes[] }) => {
  return children.map((route: IRoutes, i: number) => (
    <RouteWithSubRoutes key={i} {...route} />
  ));
};

export default Wrapper;
