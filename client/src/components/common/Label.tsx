import React from "react";

interface LabelProps {
  /**
   * The text to display as the label.
   */
  label: string;
  /**
   * The id of the input element this label is associated with.
   */
  id: string;
}

/**
 * A UI component for a form label.
 * @param label - The text to display as the label.
 * @param id - The id of the input element this label is associated with.
 */
const Label: React.FC<LabelProps> = (props) => {
  return (
    <label
      htmlFor={props.id}
      className="w-full text-sm text-gray-700 font-medium truncate"
      title={props.label}
    >
      {props.label}:
    </label>
  );
};

export default Label;
