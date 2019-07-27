import * as React from "react";
import { RouteComponentProps, withRouter } from "react-router-dom";

class ScrollToTop extends React.PureComponent<RouteComponentProps> {
  public componentDidUpdate(prevProps: RouteComponentProps) {
    if (this.props.location !== prevProps.location) {
      const $mainWrapper = document.querySelector(".main-wrapper");
      if ($mainWrapper) {
        $mainWrapper.scrollTop = 0;
      }
    }
  }

  public render() {
    return (
      <div className="main-wrapper"
      style={{
        position: "absolute",
        padding: "10px",
        top: 0,
        right: 0,
        left: 0,
        bottom: 0,
        background: "#f0f2f5",
        overflow: "auto"
      }}>
        <div 
          style={{
            padding: "15px",
            minHeight: "100%",
            background: "#fff"
          }}
          >
          {this.props.children}
        </div>
      </div>
    );
  }
}

export default withRouter(ScrollToTop);
