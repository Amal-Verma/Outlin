import { DRAW, MOUSE } from "@/Enums/mouseEventsEnums";

import { node, tree } from "@/types";

let clickTimeout: NodeJS.Timeout | null = null;

export const handleMouseDownObject = (
  e: React.MouseEvent<HTMLDivElement>,
  object: node,
  EditMouseType: (type: MOUSE) => void,
  Tree: tree,
  drawType: number,
  forceRenderWorkspace: () => void
) => {
  if (drawType !== DRAW.SELECT) return;
  e.preventDefault();

  let skipSingleClick = false;

  // Check if the object or its group node is already selected
  const groupNode = Tree.groupMap.get(object.group)?.groupNode;
  if (
    (groupNode && Tree.selectedObject.includes(groupNode)) ||
    Tree.selectedObject.includes(object)
  ) {
    EditMouseType(MOUSE.MOVESELECTED);
    skipSingleClick = true;
  }

  // Function to handle single click
  function singleClick() {
    if (skipSingleClick) {
      forceRenderWorkspace();
      return;
    }
    console.log("Executing singleClick");
    Tree.selectedObject = [groupNode!];
    forceRenderWorkspace();
  }

  // Function to handle double click
  function doubleClick() {
    console.log("inside double click");
    if (e.ctrlKey) {
      Tree.selectedObject.push(object);
    } else {
      Tree.selectedObject = [object];
    }
    forceRenderWorkspace(); // This is called during double-click
  }

  // Check for double click
  if (
    clickTimeout ||
    object.group == "root" ||
    object.group == "temp" ||
    e.ctrlKey
  ) {
    clearTimeout(clickTimeout as NodeJS.Timeout);
    clickTimeout = null;
    console.log("Double Mouse Down Action");
    doubleClick(); // Double-click detected, calling doubleClick function
    return;
  }

  // Set timeout for single click detection
  clickTimeout = setTimeout(() => {
    console.log("Single Mouse Down Action");
    singleClick();
    clickTimeout = null;
  }, 200); // Delay to check if double click happens
};
