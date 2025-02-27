import React from "react";
import Input from "./Input";
import ColorPicker from "./colorSelector";

interface ColorPickerUIProps {
  /**
   * The current color value.
   */
  value: string;
  /**
   * Function to handle the change in color value.
   * @param value - The new color value.
   */
  onChange: (value: string) => void;
}

/**
 * A UI component that combines a text input and a color picker.
 * @param value - The current color value.
 * @param onChange - Function to handle the change in color value.
 */
const ColorPickerUI: React.FC<ColorPickerUIProps> = ({ value, onChange }) => {
  return (
    <div className="flex gap-2">
      <div className="flex justify-center items-center w-3/4">
        <Input value={value} onChange={onChange} type="text" />
      </div>
      <div className="w-1/4">
        <ColorPicker value={value} onChange={onChange} />
      </div>
    </div>
  );
};

export default ColorPickerUI;
