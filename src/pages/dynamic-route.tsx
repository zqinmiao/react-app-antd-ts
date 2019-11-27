import * as React from "react";
// import { Link } from "react-router-dom";
// import RouteWithSubRoutes from "src/router/route-with-sub-routes";
import { IMatch, IRoutes } from "types/index";

const Dynamic = ({ match, children }: { match: IMatch; children: IRoutes[] }) => {
  console.log("match", match);
  const {params}: any = match;
  return (
    <div>
      <h2>Dynamic</h2>
      <div>params: {params.id}</div>
    </div>
  );
};

export default Dynamic;
