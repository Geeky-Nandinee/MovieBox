import React from "react";
import ReactDOM from "react-dom";
import { createRoot } from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";

import "./index.css";
import ContextProviders from "./context";

const rootElement = document.getElementById("root");

const root = ReactDOM.createRoot(rootElement);
root.render(
  <BrowserRouter>
    <ContextProviders>
      <App />
    </ContextProviders>
  </BrowserRouter>
);



// import React from "react";
// import ReactDOM from "react-dom";
// import App from "./App";
// import { BrowserRouter } from "react-router-dom";

// import "./index.css";
// import ContextProviders from "./context";

// ReactDOM.render(
//   <BrowserRouter>
//     <ContextProviders>
//       <App />
//     </ContextProviders>
//   </BrowserRouter>,
//   document.getElementById("root")
// );
