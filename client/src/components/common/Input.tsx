import React from "react";

interface InputProps {
  /**
   * The current input value.
   */
  value: string;
  /**
   * The type of the input element.
   */
  type?: string;
  /**
   * Function to handle the change in input value.
   * @param text - The new input value.
   */
  onChange: (text: string) => void;
}

/**
 * A UI component for a text input.
 * @param value - The current input value.
 * @param type - The type of the input element.
 * @param onChange - Function to handle the change in input value.
 */
const Input: React.FC<InputProps> = (props) => {
  return (
    <input
      className="w-full text-sm text-gray-700 font-medium truncate text-center rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      type={props.type || "text"}
      placeholder="Enter text here"
      value={props.value}
      onChange={(e) => props.onChange(e.target.value)}
    />
  );
};

export default Input;
