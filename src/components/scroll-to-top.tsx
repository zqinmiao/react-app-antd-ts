import * as React from "react";
import { withRouter } from "react-router-dom";

class ScrollToTop extends React.PureComponent<any> {
  public componentDidUpdate(prevProps: any) {
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
