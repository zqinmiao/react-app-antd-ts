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
    return this.props.children;
  }
}

export default withRouter(ScrollToTop);
