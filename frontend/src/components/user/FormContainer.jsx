// FormContainer.jsx
import React from "react";
import "./FormContainer.css"; // Import the CSS file for styling

const FormContainer = ({ children }) => {
  return <div className="form-container">{children}</div>;
};

export default FormContainer;
