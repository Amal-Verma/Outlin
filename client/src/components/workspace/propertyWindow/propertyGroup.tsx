"use client";

import React from "react";

import PropertyItem from "./propertyItem";
import { getAttributeDetail } from "@/hooks/useAttribute";
import { essentials, group } from "@/types/object_types";

interface PropertyGroupProps {
  name: string;
  attribute: group | essentials;
  onChange: (name: string, value: string) => void;
}

const PropertyGroup: React.FC<PropertyGroupProps> = (props) => {
  return (
    <div className="relative mt-5 w-5/6 border-2 border-black rounded-md select-none">
      <span className="absolute -top-3 left-3 bg-white px-1 text-sm rounded-md">
        {props.name}
      </span>

      <div className="flex flex-col space-y-2 p-2">
        {
          // Render each attribute as a PropertyItem
          Object.entries(props.attribute).map(([name, value], index) => (
            <PropertyItem
              key={index}
              id={`property-item-${index}`}
              type={getAttributeDetail(name).ui.type}
              label={name}
              value={value.toString()}
              uiConfig={getAttributeDetail(name).ui}
              onChange={(value: string) => props.onChange(name, value)}
            />
          ))
        }
      </div>
    </div>
  );
};

export default PropertyGroup;
