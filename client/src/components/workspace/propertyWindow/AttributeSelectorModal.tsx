import React, { useState, useRef, useEffect } from "react";
import AttributeSelector from "./AttributeSelector";

// Define the props interface for the AttributeSelectorModal component
interface AttributeSelectorModalProps {
  forceRenderWorkspace: () => void;
}

// Define the AttributeSelectorModal functional component
const AttributeSelectorModal: React.FC<AttributeSelectorModalProps> = (
  props
) => {
  const [showAttributeSelector, setShowAttributeSelector] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  // Handle click outside the modal to close it
  const handleClickOutside = (event: MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
      setShowAttributeSelector(false);
    }
  };

  // Add or remove event listener for clicks outside the modal
  useEffect(() => {
    if (showAttributeSelector) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showAttributeSelector]);

  return (
    <>
      {/* Button to show the attribute selector modal */}
      <button
        className="bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 p-3 rounded-full shadow-lg transform transition-transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-yellow-600 focus:ring-opacity-50 mt-2 w-48 flex items-center justify-center"
        onClick={() => setShowAttributeSelector(true)}
      >
        <span className="text-white text-2xl font-bold mr-2">+</span>
        <span className="text-white text-lg font-medium">Add Attribute</span>
      </button>
      {showAttributeSelector && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
          <div ref={modalRef} className="bg-white p-4 rounded-md relative">
            {/* Button to close the modal */}
            <button
              className="absolute top-2 right-2 text-gray-500"
              onClick={() => setShowAttributeSelector(false)}
            >
              &times;
            </button>
            {/* Render the AttributeSelector component */}
            <AttributeSelector
              forceRenderWorkspace={props.forceRenderWorkspace}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default AttributeSelectorModal;
