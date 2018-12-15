import { Spin } from "antd";
import * as React from "react";

const Loading = () => {
  return (
    <div
      style={{
        position: "relative",
        textAlign: "center",
        background: "transparent",
        borderRadius: 4,
        height: "100%"
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
