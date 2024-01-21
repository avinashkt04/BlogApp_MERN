import React from "react";
import loading from "../assets/loading.gif";

function Spinner({ width }) {
  return (
    <div className="flex justify-center items-center">
      <img src={loading} alt="Loading" className={`w-9 w-${width}`} />
    </div>
  );
}

export default Spinner;
