import React, { useId } from "react";

const Input = React.forwardRef(function Input(
  { label, type = "text", className, ...props },
  ref
) {
  const id = useId();
  return (
    <div className="flex flex-col">
      {label && (
        <label className="inline-block mb-1 pl-2 w-full" htmlFor={id}>
          {label}
        </label>
      )}
      <input
        id={id}
        type={type}
        className={`mx-2 bg-white outline-none border-2 border-gray-200 text-black rounded-lg px-3 py-1 focus:bg-gray-100 ${className}`}
        {...props}
        ref={ref}
        autoComplete={id}
      />
    </div>
  );
});

export default Input;
