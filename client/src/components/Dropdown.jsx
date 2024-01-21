import React, { useId } from "react";
import { Button } from "./index";

function Dropdown({ children, className }) {
  const id = useId();
  return (
    <>
      <div className="absolute bg-[#181d30] right-0 shadow-2xl rounded-md py-2 mt-3">
        <ul>
          {children.map((button) => (
            <li className={`${className}`} key={button.name}>
              <Button onClick={button.onClick}>{button.name}</Button>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default Dropdown;
