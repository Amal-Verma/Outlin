import { DRAW, MOUSE } from "@/Enums/mouseEventsEnums";
import { node, tree } from "@/types";

import { createNode } from "@/objects/tree/functions/createNode";

export const handleMouseUp = (
  e: React.MouseEvent<HTMLDivElement>,
  EditMousePoint: (mouseX: number, mouseY: number) => void,
  EditMouseDown: (mouseDown: boolean) => void,
  setTempObjects: (tempObject: Array<node>) => void,
  tempObjects: Array<node>,
  mouseType: MOUSE,
  drawType: DRAW,
  EditMouseType: (mouseType: MOUSE) => void,
  EditDrawType: (drawType: DRAW) => void,
  Tree: tree,
  forceRender: () => void
) => {
  e.preventDefault();
  // Reset mouse point and mouse down state
  EditMousePoint(0, 0);
  EditMouseDown(false);
  EditMouseType(MOUSE.NONE);
  Tree.normalize();

  // Handle temporary objects based on draw type
  if (tempObjects.length) {
    if (drawType === DRAW.SELECTRANGE) {
      Tree.selectRange(tempObjects[0].body);
      EditDrawType(DRAW.SELECT);
    } else {
      tempObjects.forEach((tempObject) => {
        Tree.insert(createNode(Tree, tempObject.body));
      });
    }
    setTempObjects([]);
  }

  // Force re-render
  forceRender();
};
