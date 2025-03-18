import { node, tree } from "@/types/object_types";
import { getGroupNodes } from "./getgroupnodes";

/**
 * Moves the given selected objects by the specified dx and dy.
 * Recursively moves the children nodes if the object is a group node.
 *
 * @param Tree - The tree structure containing the nodes.
 * @param selectedObject - The set or array of selected nodes.
 * @param dx - The change in x-coordinate.
 * @param dy - The change in y-coordinate.
 */
export const moveObject = (
  Tree: tree,
  selectedObject: Array<node>,
  dx: number,
  dy: number,
) => {
  if (selectedObject.length == 0)
    return;

  selectedObject = getGroupNodes(Tree, selectedObject);

  selectedObject.forEach((node) => {
    if (!Tree.changeAttributeInstructionsMapTracker.has(node.id)) {
      Tree.changeAttributeInstructionsMapTracker.set(node.id, [
        {id: node.id, attribute_group: "Essentials", attribute: "x", previous_value: node.body.attributes.Essentials.x, next_value: node.body.attributes.Essentials.x + dx},
        {id: node.id, attribute_group: "Essentials", attribute: "y", previous_value: node.body.attributes.Essentials.y, next_value: node.body.attributes.Essentials.y + dy},
      ]);
    }
  });

  selectedObject.forEach((node) => {
    node.body.attributes.Essentials.x += dx;
    node.body.attributes.Essentials.y += dy;
  });
};
