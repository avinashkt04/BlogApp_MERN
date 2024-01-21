import React from "react";
import logo from "../assets/logo.png";

function Logo({ className }) {
  return <img src={logo} alt="Logo" className={`${className}`} />;
}

export default Logo;
