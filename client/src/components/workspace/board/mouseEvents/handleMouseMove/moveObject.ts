import { node, tree } from "@/types";

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
  selectedObject: Array<node> | Set<node>,
  dx: number,
  dy: number
) => {
  if (
    (selectedObject instanceof Set
      ? selectedObject.size
      : selectedObject.length) == 0
  )
    return;

  selectedObject.forEach((node) => {
    node.body.Essentials.x += dx;
    node.body.Essentials.y += dy;
    const groupMultiset = Tree.groupMap.get(node.group);
    if (groupMultiset?.groupNode === node) {
      moveObject(Tree, groupMultiset.nodes, dx, dy);
    }
  });
};
