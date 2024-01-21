import React from "react";

function Button({ children, type = "button", className, ...props }) {
  return (
    <button
      className={`px-2 sm:px-3 py-2 mx-1 sm:mx-2 rounded-md ${className}`}
      type={type}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;
