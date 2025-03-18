import { DRAW, MOUSE } from "@/Enums/mouseEventsEnums";
import { node, tree } from "@/types/object_types";

import { createNode } from "@/objects/tree/functions/createNode";
import { attribute_change } from "@/types/undo_redo_instructions_types";

export const handleMouseUp = (
  e: React.MouseEvent<HTMLDivElement>,
  EditMousePoint: (mouseX: number, mouseY: number) => void,
  EditMouseDown: (mouseDown: boolean) => void,
  setTempObjects: (tempObject: Array<node>) => void,
  setObjects: (Object: node | null) => void,
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

  // Add move and resize changes to undo/redo tracker
  if (Tree.changeAttributeInstructionsMapTracker.size > 0) {
    const changes: Array<attribute_change> = [];

    Tree.changeAttributeInstructionsMapTracker.forEach((value, key) => {
      for (let i = 0; i < value.length; i++) {
        value[i].next_value = Tree.objectMap.get(key)?.body.attributes[value[i].attribute_group][value[i].attribute] ?? 0;
        changes.push(value[i]);
      }
    });

    Tree.undo_redo_tracker.addInstruction({type: "attribute", changes: changes});
    Tree.changeAttributeInstructionsMapTracker.clear();

  }

  setObjects(null);

  // Handle temporary objects based on draw type
  if (tempObjects.length) {

    switch (drawType) {
      case DRAW.SELECTRANGE:
        Tree.selectRange(tempObjects[0].body);
        EditDrawType(DRAW.SELECT);
        break;
      case DRAW.DRAW:
        let create_nodes: Array<node> = [];
        tempObjects.forEach((tempObject) => {
          const newNode = createNode(Tree, tempObject.body)
          create_nodes.push(newNode);
          Tree.insert(newNode);
        });
        Tree.undo_redo_tracker.addInstruction({type: "create", nodes: create_nodes});

        break;
      default:
        break;
    }
    setTempObjects([]);
  }

  // Force re-render
  forceRender();
};
