import * as React from "react";
import { Link } from "react-router-dom";
import RouteWithSubRoutes from "src/router/route-with-sub-routes";
import { IMatch, IRoutes } from "types/index";

const User = ({ match, routes }: { match: IMatch; routes: IRoutes[] }) => {
  console.log(match);
  return (
    <div>
      <h2>Tacos</h2>
      <ul>
        <li>
          <Link to="/user/data/index">data</Link>
        </li>
        <li>
          <Link to="/user/data/activity">activity</Link>
        </li>
      </ul>
      {routes.map((route: IRoutes, i: number) => (
        <RouteWithSubRoutes key={i} {...route} />
      ))}
    </div>
  );
};

export default User;
