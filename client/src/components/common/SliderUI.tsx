import React from "react";
import Input from "./Input";

interface SliderUIProps {
  /**
   * The current slider value.
   */
  value: string | number;
  /**
   * Function to handle the change in slider value.
   * @param value - The new slider value.
   */
  onChange: (value: string) => void;
  /**
   * The minimum value of the slider.
   */
  min?: number;
  /**
   * The maximum value of the slider.
   */
  max?: number;
  /**
   * The step value of the slider.
   */
  step?: number;
}

/**
 * A UI component that combines a range slider and a numeric input.
 * @param value - The current slider value.
 * @param onChange - Function to handle the change in slider value.
 * @param min - The minimum value of the slider.
 * @param max - The maximum value of the slider.
 * @param step - The step value of the slider.
 */
const SliderUI: React.FC<SliderUIProps> = ({
  value,
  onChange,
  min = 0,
  max = 100,
  step = 1,
}) => {
  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  return (
    <div className="flex gap-2">
      <input
        type="range"
        value={value}
        onChange={handleSliderChange}
        min={min}
        max={max}
        step={step}
        className="w-3/4"
      />
      <div className="w-1/4">
        <Input value={value.toString()} onChange={onChange} type="number" />
      </div>
    </div>
  );
};

export default SliderUI;
