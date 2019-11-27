import * as React from "react";
import { Link } from "react-router-dom";


class Data extends React.PureComponent {
  public componentDidMount() {
    console.log("Data componentDidMount");
  }
  public render() {
    return (
      <div>
        <h2>Data</h2>
        <Link to="/user/data/index/111">id</Link>    
      </div>
    );
  }
}

export default Data;
