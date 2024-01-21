import React, { useEffect } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Controller } from "react-hook-form";

export default function Editor({ name, control, label, defaultValue = "" }) {
  const modules = {
    toolbar: [
      [{ header: [1, 2, false] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      ["link", "image"],
      ["clean"],
    ],
  };

  useEffect(() => {
    const quillStyle = document.createElement("style");
    quillStyle.innerHTML = `
      .ql-container.ql-snow {
        border: none !important;
      }
      
      .ql-toolbar.ql-snow {
        border-top: none !important;
        border-left: none !important;
        border-right: none !important;
        border-bottom: 1px solid black;
      }
    `;
    document.head.appendChild(quillStyle);

    return () => {
      document.head.removeChild(quillStyle);
    };
  }, []);

  return (
    <div className="content border-none mx-2">
      {label && <label className="inline-block mb-1 pl-1">{label}</label>}

      <Controller
        name={name || "content"}
        control={control}
        defaultValue={defaultValue}
        render={({ field }) => (
          <ReactQuill
            className="bg-white rounded-xl text-black border-none"
            value={field.value}
            theme="snow"
            onChange={(content) => field.onChange(content)}
            modules={modules}
            style={{ minHeight: "300px", border: "none !important" }}
          />
        )}
      />
    </div>
  );
}
