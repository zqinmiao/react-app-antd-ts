import { Spin } from "antd";
import * as React from "react";

const Loading = () => {
  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        textAlign: "center",
        background: "transparent",
        borderRadius: 4
      }}
    >
      <Spin
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%,-50%)"
        }}
      />
    </div>
  );
};

export default Loading;
