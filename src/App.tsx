import * as React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Layouts from "src/layouts/index";
class App extends React.PureComponent {
  public render() {
    console.warn("Render App");
    return (
      <div
        className="app-wrapper"
        style={{
          height: "100%"
        }}
      >
        <Router>
          <Layouts />
        </Router>
      </div>
    );
  }
}

export default App;
