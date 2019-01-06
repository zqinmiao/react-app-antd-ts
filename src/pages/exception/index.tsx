import { Button } from "antd";
import satellite from "assets/404.svg";
import * as React from "react";
import "./style.scss";

export default () => {
  return (
    <div className="exception-wrapper">
      <div className="exception-img">
        <div
          style={{ backgroundImage: `url(${satellite})` }}
          className="satellite-img"
        />
      </div>
      <div className="exception-content">
        <h1 className="exception-content__title">404</h1>
        <div className="exception-content__desc">抱歉，你访问的页面不存在</div>
        <div className="exception-content__actions">
          <Button type="primary" href="/">
            返回首页
          </Button>
        </div>
      </div>
    </div>
  );
};
