import React from "react";
import Signin from "./components/auth/Signin";
import Navbar from "./components/user/Navbar";

export default function App() {
  return (
    <>
      <Navbar />
      <Signin />
    </>
  );
}
