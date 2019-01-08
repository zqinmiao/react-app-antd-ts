import { Button } from "antd";
import satellite from "assets/404.svg";
import * as React from "react";
import "./style.scss";

export default ({
  title,
  desc,
  showAction
}: {
  title: string;
  desc: string;
  showAction?: boolean;
}) => {
  return (
    <div className="exception-wrapper">
      <div className="exception-img">
        <div
          style={{ backgroundImage: `url(${satellite})` }}
          className="satellite-img"
        />
      </div>
      <div className="exception-content">
        <h1 className="exception-content__title">{title}</h1>
        <div className="exception-content__desc">{desc}</div>
        <div className="exception-content__actions">
          {showAction ? (
            <Button type="primary" href="/">
              返回首页
            </Button>
          ) : null}
        </div>
      </div>
    </div>
  );
};
