import logo from "assets/logo.svg";
import * as React from "react";

class SidebarLogo extends React.PureComponent {
  public render() {
    return (
      <div className="sidebar-logo">
        <a href="/">
          <img src={logo} className="logo" alt="logo" />
          <h1 className="title">Management System</h1>
        </a>
      </div>
    );
  }
}

export default SidebarLogo;
