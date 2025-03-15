import { DRAW, MOUSE } from "@/Enums/mouseEventsEnums";
import { tree, node } from "@/types/object_types";

import { resizeObject } from "./resizeObject";
import { moveObject } from "./moveObject";

let lastExecutionTime = 0;
const FPS = 60;
const FRAME_DURATION = 1000 / FPS;

export const handleMouseMove = (
  e: React.MouseEvent<HTMLDivElement>,
  EditMousePoint: (mouseX: number, mouseY: number) => void,
  EditRefPoint: (xref: number, yref: number) => void,
  mouseDown: boolean,
  mouseType: MOUSE,
  drawType: DRAW,
  tempObjects: Array<node> | null,
  mouseX: number,
  mouseY: number,
  scale: number,
  Tree: tree,
  object: node | null,
  forceRenderTempSelected: () => void
) => {
  e.preventDefault();
  if (!mouseDown) return;

  const currentTime = Date.now();
  if (currentTime - lastExecutionTime < FRAME_DURATION) return;
  lastExecutionTime = currentTime;

  // Update mouse point
  EditMousePoint(e.clientX, e.clientY);

  const dx = (e.clientX - mouseX) / scale;
  const dy = (e.clientY - mouseY) / scale;

  // Handle drawing or selecting range
  if (
    tempObjects?.length &&
    (drawType === DRAW.DRAW || drawType === DRAW.SELECTRANGE)
  ) {
    tempObjects[0].body.attributes.Essentials.width += dx;
    tempObjects[0].body.attributes.Essentials.height += dy;
  }

  // Handle panning
  if (drawType === DRAW.PAN) {
    EditRefPoint(dx, dy);
  }

  // Handle resizing or moving selected objects
  if (
    mouseType <= MOUSE.SELECTEDEVENTSTART ||
    mouseType >= MOUSE.SELECTEDEVENTEND
  )
    return;
  switch (mouseType) {
    case MOUSE.TOPLEFT:
      resizeObject(object, Tree, Tree.selectedObject, dx, dy, 0, 0);
      break;
    case MOUSE.TOPMIDDLE:
      resizeObject(object, Tree, Tree.selectedObject, 0, dy, 0, 0);
      break;
    case MOUSE.TOPRIGHT:
      resizeObject(object, Tree, Tree.selectedObject, 0, dy, dx, 0);
      break;
    case MOUSE.MIDDLELEFT:
      resizeObject(object, Tree, Tree.selectedObject, dx, 0, 0, 0);
      break;
    case MOUSE.MIDDLERIGHT:
      resizeObject(object, Tree, Tree.selectedObject, 0, 0, dx, 0);
      break;
    case MOUSE.BOTTOMLEFT:
      resizeObject(object, Tree, Tree.selectedObject, dx, 0, 0, dy);
      break;
    case MOUSE.BOTTOMMIDDLE:
      resizeObject(object, Tree, Tree.selectedObject, 0, 0, 0, dy);
      break;
    case MOUSE.BOTTOMRIGHT:
      resizeObject(object, Tree, Tree.selectedObject, 0, 0, dx, dy);
      break;
    case MOUSE.MOVESELECTED:
      moveObject(Tree, Tree.selectedObject, dx, dy);
      break;
    default:
      break;
  }

  // Force re-render temporary selected objects
  forceRenderTempSelected();
};
