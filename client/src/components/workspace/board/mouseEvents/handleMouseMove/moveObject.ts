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
    node.body.Essentials.x += dx;
    node.body.Essentials.y += dy;
  });
};
