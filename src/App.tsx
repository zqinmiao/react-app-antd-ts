import * as React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Layouts from "src/layouts/index";


class App extends React.PureComponent {
  public render() {
    console.warn("Render App");
    return (
      <Router>
        <Layouts />
      </Router>
    );
  }
}

export default App;