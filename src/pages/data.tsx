import * as React from "react";

class Data extends React.PureComponent {
  public componentDidMount() {
    console.log("Data componentDidMount");
  }
  public render() {
    return <h2>Data</h2>;
  }
}

export default Data;
