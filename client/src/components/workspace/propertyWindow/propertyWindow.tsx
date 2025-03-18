"use client";

import React from "react";

import PropertyGroup from "./propertyGroup";
import AttributeSelectorModal from "./AttributeSelectorModal";
import { tree } from "@/types/object_types";
import { useTree } from "@/hooks/useTree";
import { attribute_change } from "@/types/undo_redo_instructions_types";
import { set } from "lodash";

interface PropertyWindowProps {
  renderWorkspace: boolean;
  forceRenderWorkspace: () => void;
}

const PropertyWindow: React.FC<PropertyWindowProps> = (props) => {
  // Hook to access the tree structure
  const Tree: tree = useTree;

  const [is_changed, set_is_changed] = React.useState(false);

  const [change_instruction, set_change_instruction] = React.useState<attribute_change | null>();

  const [timeout, set_timeout] = React.useState<{"hash": string,
   time: NodeJS.Timeout} | null>(null);

  const delay = 1000;

  // Function to handle changes and force re-render of the workspace
  const handleOnChange = () => {
    props.forceRenderWorkspace();
  };

  const handleTimeout = (hash: string, change: attribute_change) => {
    Tree.addInstruction({type: "attribute", changes: [change!]});
    if (timeout && timeout.hash === hash) {
      set_timeout(null);
      set_change_instruction(null);
      set_is_changed(false);
    }    
  }

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
            {/* <PropertyGroup
              key={`Property-groups-attributes.Essentials`}
              name="Essentials"
              attribute={Tree.selectedObject[0].body.attributes.Essentials}
              onChange={(name: string, value: string) => {
                if (
                  typeof Tree.selectedObject[0].body.attributes.Essentials[name] ===
                  "number"
                ) {
                  Tree.selectedObject[0].body.attributes.Essentials[name] =
                    value.length > 0 ? parseInt(value) : 0;
                } else {
                  Tree.selectedObject[0].body.attributes.Essentials[name] = value;
                }
              }}
            /> */}
            {Object.entries(Tree.selectedObject[0].body.attributes).map(
              ([groupName, attrs], i) => (
                // groupName !== "Essentials" ? (
                  <PropertyGroup
                    key={`Property-groups-${i}`}
                    name={groupName}
                    attribute={attrs}
                    // onChange={(name: string, value: string) => {
                    //   Tree.selectedObject[0].body.attributes[groupName][name] =
                    //     value;
                    // }}
                    onChange={(name: string, value: string) => {
                      const hash = `${Tree.selectedObject[0].id}-${groupName}-${name}`;
                      set_is_changed(true);

                      if (!timeout || timeout.hash !== hash) {
                        const new_change_instruction: attribute_change = {
                          id: Tree.selectedObject[0].id,
                          attribute_group: groupName,
                          attribute: name,
                          previous_value: Tree.selectedObject[0].body.attributes[groupName][name],
                          next_value: value
                        }
                        set_change_instruction(new_change_instruction);
                        set_timeout(
                          {
                            hash: hash,
                            time: setTimeout(() => {
                              handleTimeout(hash, new_change_instruction);
                            }, delay)
                          }
                        )
                      }
                      else if (timeout && timeout.hash === hash) {
                        clearTimeout(timeout.time);
                        change_instruction!.next_value = value;
                        timeout.time = setTimeout(() => {
                          handleTimeout(hash, change_instruction!);
                        }, delay);
                      }

                      if (
                        typeof Tree.selectedObject[0].body.attributes[groupName][name] ===
                        "number"
                      ) {
                        Tree.selectedObject[0].body.attributes[groupName][name] =
                          value.length > 0 ? parseInt(value) : 0;
                      } else {
                        Tree.selectedObject[0].body.attributes[groupName][name] = value;
                      }
                    }}
                  />
                  // ) : null
              )
            )}
          </React.Fragment>
        ) : null
      }
    </div>
  );
};

export default PropertyWindow;
