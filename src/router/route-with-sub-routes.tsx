import * as React from "react";
import { Route } from "react-router-dom";

const RouteWithSubRoutes = (route: any) => {
  return (
    <Route
      path={route.path}
      exact={route.exact}
      strict={route.strict}
      render={props => (
        // pass the sub-routes down to keep nesting
        <route.component {...props} routes={route.routes} />
      )}
    />
  );
};

export default RouteWithSubRoutes;
