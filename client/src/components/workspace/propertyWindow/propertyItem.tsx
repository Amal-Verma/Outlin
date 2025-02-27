"use client";

import React from "react";
import Label from "@/components/common/Label";
import Input from "@/components/common/Input";
import ColorPickerUI from "@/components/common/ColorPickerUI";
import SliderUI from "@/components/common/SliderUI";
import SelectUI from "@/components/common/SelectUI";

interface PropertyItemProps {
  id: string;
  label: string;
  value: string;
  type?: string;
  uiConfig?: {
    min?: number;
    max?: number;
    step?: number;
    options?: string[];
    type?: string; // Add this line
  };
  onChange: (value: string) => void;
}

const PropertyItem: React.FC<PropertyItemProps> = (props) => {
  // const [value, setValue] = React.useState('')

  // Handle change in input value
  const handleChange = (text: string) => {
    // setValue(text)
    props.onChange(text);
  };

  // Render the appropriate input control based on the type
  const renderInputControl = () => {
    switch (props.type) {
      case "colorPicker":
        return <ColorPickerUI value={props.value} onChange={handleChange} />;
      case "slider":
        return (
          <SliderUI
            value={props.value}
            onChange={handleChange}
            min={props.uiConfig?.min}
            max={props.uiConfig?.max}
            step={props.uiConfig?.step}
          />
        );
      case "select":
        return (
          <SelectUI
            value={props.value}
            onChange={handleChange}
            options={props.uiConfig?.options || []}
          />
        );
      default:
        return (
          <Input
            value={props.value}
            onChange={handleChange}
            type={props.type || "text"}
          />
        );
    }
  };

  return (
    <div className="flex flex-col">
      <Label id={props.id} label={props.label} />
      {renderInputControl()}
    </div>
  );
};

export default PropertyItem;
