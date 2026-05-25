import React from "react";
import "./Loading.css";

const Loading = ({ size = 60 }) => {
  return (
    <div
      className="loader"
      style={{
        width: `${size}px`,
        height: `${size}px`,
        borderWidth: `${size / 8}px`,
      }}
    ></div>
  );
};

export default Loading;
