import * as React from "react";
import RouteWithSubRoutes from "src/router/route-with-sub-routes";

const Wrapper = ({ routes }: any) => {
  return routes.map((route: any, i: number) => (
    <RouteWithSubRoutes key={i} {...route} />
  ));
};

export default Wrapper;
