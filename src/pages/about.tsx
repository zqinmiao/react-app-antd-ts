import * as React from "react";
class About extends React.PureComponent {
  public componentDidMount() {
    console.log("componentDidMount");
  }
  public render() {
    return <h2>About</h2>;
  }
}

export default About;
