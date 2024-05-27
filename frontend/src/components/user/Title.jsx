// Title.jsx
import React from "react";
import "./Title.css"; // Import the CSS file for styling

const Title = ({ children }) => {
  return <h2 className="form-title">{children}</h2>;
};

export default Title;
