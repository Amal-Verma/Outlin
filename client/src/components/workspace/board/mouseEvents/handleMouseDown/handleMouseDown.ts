import { DRAW } from "@/Enums/mouseEventsEnums";
import Rectangle from "@/objects/rectangle/rectangle";
import Node from "@/objects/node/node";
import { node } from "@/types";

export const handleMouseDown = (
  e: React.MouseEvent<HTMLDivElement>,
  EditMousePoint: (mouseX: number, mouseY: number) => void,
  EditMouseDown: (mouseDown: boolean) => void,
  setTempObjects: (tempObject: Array<node>) => void,
  xref: number,
  yref: number,
  scale: number,
  drawType: DRAW,
  forceRenderTempSelected: () => void
) => {
  e.preventDefault();
  // Update mouse point and mouse down state
  EditMousePoint(e.clientX, e.clientY);
  EditMouseDown(true);

  // Handle different draw types
  switch (drawType) {
    case DRAW.DRAW:
    case DRAW.SELECTRANGE:
      setTempObjects([
        new Node(
          new Rectangle(
            e.clientX / scale - xref,
            e.clientY / scale - yref,
            0,
            0
          )
        ),
      ]);
      break;
    case DRAW.SELECT:
      break;
    default:
      break;
  }

  // Force re-render temporary selected objects
  forceRenderTempSelected();
};
