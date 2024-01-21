import React, { useId } from "react";

const TextForm = React.forwardRef(function TextForm(
  { label, className, ...props },
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

      <textarea
        id={id}
        className={`mx-2 bg-white outline-none border-2 border-gray-200 text-black rounded-lg px-3 py-1 focus:bg-gray-100 ${className}`}
        {...props}
        ref={ref}
        cols="30"
        rows="8"
      ></textarea>
    </div>
  );
});

export default TextForm;
