import React, { useId } from "react";

const Select = React.forwardRef(function Select(
  { options, label, className, ...props },
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
      <select
        id={id}
        className={`mx-2 bg-white outline-none border-2 border-gray-200 text-black rounded-lg px-3 py-1 focus:bg-gray-100 ${className}`}
        {...props}
        ref={ref}
      >
        {options?.map((option) => (
          <option key={option} value={option} className="w-[20%]">
            {option}
          </option>
        ))}
      </select>
    </div>
  );
});

export default Select;
