import React from "react";

interface SelectUIProps {
  /**
   * The current selected value.
   */
  value: string;
  /**
   * Function to handle the change in selected value.
   * @param value - The new selected value.
   */
  onChange: (value: string) => void;
  /**
   * The list of options to select from.
   */
  options: string[];
}

/**
 * A UI component for a dropdown select input.
 * @param value - The current selected value.
 * @param onChange - Function to handle the change in selected value.
 * @param options - The list of options to select from.
 */
const SelectUI: React.FC<SelectUIProps> = ({ value, onChange, options }) => {
  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onChange(e.target.value);
  };

  return (
    <select
      value={value}
      onChange={handleSelectChange}
      className="w-full p-1 rounded bg-white border border-gray-300"
    >
      {options.map((option, index) => (
        <option key={index} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
};

export default SelectUI;
