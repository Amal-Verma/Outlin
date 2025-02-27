import React from "react";

interface ColorPickerProps {
  /**
   * The current color value.
   */
  value: string;
  /**
   * Function to handle the change in color value.
   * @param color - The new color value.
   */
  onChange: (color: string) => void;
}

/**
 * A UI component for a color picker input.
 * @param value - The current color value.
 * @param onChange - Function to handle the change in color value.
 */
const ColorPicker: React.FC<ColorPickerProps> = (props) => {
  return (
    <input
      type="color"
      className="w-full h-8 rounded-sm cursor-pointer"
      value={props.value}
      onChange={(e) => props.onChange(e.target.value)}
    />
  );
};

export default ColorPicker;
