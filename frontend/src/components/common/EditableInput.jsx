import React, { useEffect, useRef, useState, forwardRef } from "react";
import { MdOutlineEdit } from "react-icons/md";

const EditableInput = forwardRef(
  (
    { type = "text", isDisabled = false, label = "", className = "", ...props },
    externalRef
  ) => {
    const [isEditable, setEditable] = useState(false);
    const containerRef = useRef(null);
    const localRef = useRef(null);

    // 🔁 Merge refs
    function setRefs(el) {
      localRef.current = el;
      if (typeof externalRef === "function") {
        externalRef(el);
      } else if (externalRef) {
        externalRef.current = el;
      }
    }

    useEffect(() => {
      function handleClickOutside(event) {
        if (
          containerRef.current &&
          !containerRef.current.contains(event.target)
        ) {
          setEditable(false);
        }
      }

      document.addEventListener("mousedown", handleClickOutside);
      return () =>
        document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    useEffect(() => {
      if (isEditable && localRef.current) {
        localRef.current.focus();
      }
    }, [isEditable]);

    return (
      <label className="">
        {label && <small className="text-gray-400">{label}</small>}
        <div
          ref={containerRef}
          className="w-full flex justify-between items-center"
        >
          <input
            type={type}
            disabled={isDisabled}
            readOnly={!isEditable}
            {...props} // ✅ RHF props go first
            ref={setRefs} // ✅ Merged ref here
            className={`${className} ${
              isEditable ? "border-gray-600" : "border-transparent"
            }`}
          />
          {!isDisabled && (
            <button
              type="button" // so that if it does not submit a form
              onClick={() => setEditable(true)}
              className="rounded-xs outline-2 ml-2 outline-offset-2 outline-transparent hover:outline-gray-500 duration-100"
            >
              <MdOutlineEdit />
            </button>
          )}
        </div>
      </label>
    );
  }
);

export default EditableInput;
