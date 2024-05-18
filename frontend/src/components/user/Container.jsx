// Container.jsx
import React from "react";
import "./Container.css"; // Import the CSS file for styling

const Container = ({ children }) => {
  return <div className="container">{children}</div>;
};

export default Container;
