import * as React from "react";
import { Route } from "react-router-dom";
import { IRoutes } from "types/index";

const RouteWithSubRoutes = (route: IRoutes) => {
  return (
    <Route
      path={route.path}
      exact={route.exact}
      strict={route.strict}
      render={props => {
        return (
          // pass the sub-routes down to keep nesting
          // eslint-disable-next-line
          <route.component {...props} children={route.children} />
        );
      }}
    />
  );
};

export default RouteWithSubRoutes;
