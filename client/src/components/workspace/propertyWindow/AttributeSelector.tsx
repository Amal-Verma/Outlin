import React from "react";
import { textAttributes } from "@/attributes/textAttributes";
import { layoutAttributes } from "@/attributes/layoutAttributes";
import { colorAttributes } from "@/attributes/colorAttributes";
import { borderAttributes } from "@/attributes/borderAttributes";
import { animationAttributes } from "@/attributes/animationAttributes";
import { customAttributes } from "@/attributes/customAttributes";
import { positioningAttributes } from "@/attributes/positioningAttributes";
import { getAttributeDetailType } from "@/types/object_types";

import { useTree } from "@/hooks/useTree";

// Define the props interface for the AttributeSelector component
interface AttributeSelectorProps {
  forceRenderWorkspace: () => void;
}

// Define the AttributeSelector functional component
const AttributeSelector: React.FC<AttributeSelectorProps> = (props) => {
  // Define the attribute groups
  const attributeGroups: {
    [key: string]: { [key: string]: getAttributeDetailType };
  } = {
    Text: textAttributes,
    Layout: layoutAttributes,
    Colors: colorAttributes,
    Border: borderAttributes,
    Animation: animationAttributes,
    Custom: customAttributes,
    Positioning: positioningAttributes,
  };

  const Tree = useTree;

  // Handle attribute selection from the dropdown
  const handleAttributeSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const [group, attr] = e.target.value.split("|");

    if (
      attr &&
      attributeGroups[group][attr] &&
      Tree.selectedObject.length == 1
    ) {
      const attribute = attributeGroups[group][attr];
      console.log("attribute", attribute);
      Tree.selectedObject[0].body.addAttribute(
        attr,
        attribute.default.toString(),
        group
      );
      props.forceRenderWorkspace();
    }
  };

  return (
    // Render the attribute selector dropdown
    <select
      onChange={handleAttributeSelect}
      className="p-2 rounded-md bg-white"
    >
      <option value="">Add Attribute</option>
      {Object.entries(attributeGroups).map(([groupName, attributes]) => (
        <optgroup key={groupName} label={groupName}>
          {Object.keys(attributes).map((attr) => (
            <option key={attr} value={`${groupName}|${attr}`}>
              {attr}
            </option>
          ))}
        </optgroup>
      ))}
    </select>
  );
};

export default AttributeSelector;
