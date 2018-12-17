import * as React from "react";
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
        <Layouts />
      </div>
    );
  }
}

export default App;
