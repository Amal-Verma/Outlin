"use client";

import React from "react";

import PropertyGroup from "./propertyGroup";
import AttributeSelectorModal from "./AttributeSelectorModal";
import { tree } from "@/types";
import { useTree } from "@/hooks/useTree";

interface PropertyWindowProps {
  renderWorkspace: boolean;
  forceRenderWorkspace: () => void;
}

const PropertyWindow: React.FC<PropertyWindowProps> = (props) => {
  // Hook to access the tree structure
  const Tree: tree = useTree;

  // Function to handle changes and force re-render of the workspace
  const handleOnChange = () => {
    props.forceRenderWorkspace();
  };

  return (
    <div
      className="flex flex-col items-center h-5/6 w-2/12 bg-gray-400 fixed right-0 bottom-0 border-l border-gray-400 overflow-y-scroll"
      key={`propertyWindow`}
      onChange={() => {
        handleOnChange();
      }}
    >
      {
        // Render property groups if exactly one object is selected
        Tree.selectedObject.length == 1 ? (
          <React.Fragment key={`Property-groups`}>
            <AttributeSelectorModal
              forceRenderWorkspace={props.forceRenderWorkspace}
            />
            <PropertyGroup
              key={`Property-groups-Essentials`}
              name="Essentials"
              attribute={Tree.selectedObject[0].body.Essentials}
              onChange={(name: string, value: string) => {
                if (
                  typeof Tree.selectedObject[0].body.Essentials[name] ===
                  "number"
                ) {
                  Tree.selectedObject[0].body.Essentials[name] =
                    value.length > 0 ? parseInt(value) : 0;
                } else {
                  Tree.selectedObject[0].body.Essentials[name] = value;
                }
              }}
            />
            {Object.entries(Tree.selectedObject[0].body.attributes).map(
              ([groupName, attrs], i) => (
                <PropertyGroup
                  key={`Property-groups-${i}`}
                  name={groupName}
                  attribute={attrs}
                  onChange={(name: string, value: string) => {
                    Tree.selectedObject[0].body.attributes[groupName][name] =
                      value;
                  }}
                />
              )
            )}
          </React.Fragment>
        ) : null
      }
    </div>
  );
};

export default PropertyWindow;
