import { node, tree } from "@/types/object_types";
import { getGroupNodes } from "./getgroupnodes";

/**
 * Resizes the given object and its selected children nodes.
 * Recursively resizes the children nodes if the object is a group node.
 *
 * @param object - The node object to resize.
 * @param Tree - The tree structure containing the nodes.
 * @param selectedObject - The set or array of selected nodes.
 * @param dx1 - The change in x-coordinate for the top-left corner.
 * @param dy1 - The change in y-coordinate for the top-left corner.
 * @param dx2 - The change in x-coordinate for the bottom-right corner.
 * @param dy2 - The change in y-coordinate for the bottom-right corner.
 */
export const resizeObject = (
  object: node | null,
  Tree: tree,
  selectedObject: Array<node>,
  dx1: number,
  dy1: number,
  dx2: number,
  dy2: number,
) => {
  console.log("Resizing object", object?.id);
  console.log("Selected objects", selectedObject);
  if (selectedObject.length == 0)
    return;
  if (object === null) return;

  // // first group resize as it is skipped
  // if (
  //   first_time && 
  //   object.group_children) {
  //   // const groupNodes = Tree.groupMap.get(object.group_children)?.nodes;
  //   // if (groupNodes) {

  //   //   resizeObject(object, Tree, groupNodes, dx1, dy1, dx2, dy2);
  //   // }
    
  //   resizeObject(
  //     object,
  //     Tree, 
  //     getGroupNodes(Tree, selectedObject), 
  //     dx1, 
  //     dy1, 
  //     dx2, 
  //     dy2, 
  //     false);
  //   return;
  // }

  selectedObject = getGroupNodes(Tree, selectedObject);

  // Resize all selected object except object
  selectedObject.forEach((node) => {
    if (node.body === object.body) return;
    if (!object.body.contains(node.body)) return;

    const dw =
      (object.body.Essentials.width + dx2 - dx1) / object.body.Essentials.width;
    const dh =
      (object.body.Essentials.height + dy2 - dy1) /
      object.body.Essentials.height;

    const ndx1 =
      object.body.Essentials.x -
      node.body.Essentials.x +
      dx1 +
      (node.body.Essentials.x - object.body.Essentials.x) * dw;

    const ndy1 =
      object.body.Essentials.y -
      node.body.Essentials.y +
      dy1 +
      (node.body.Essentials.y - object.body.Essentials.y) * dh;

    const ndx2 = ndx1 + node.body.Essentials.width * dw;
    const ndy2 = ndy1 + node.body.Essentials.height * dh;

    // const groupMultiset = Tree.groupMap.get(node.group);
    // if (node.group_children) {
    //   const groupNodes = Tree.groupMap.get(node.group_children)?.nodes;
    //   if (groupNodes) {
    //     resizeObject(
    //       node,
    //       Tree,
    //       groupNodes,
    //       ndx1,
    //       ndy1,
    //       ndx2,
    //       ndy2
    //     );
    //   }
    // } else {
      node.body.Essentials.x += ndx1;
      node.body.Essentials.y += ndy1;
      node.body.Essentials.width = node.body.Essentials.width * dw;
      node.body.Essentials.height = node.body.Essentials.height * dh;
    // }
  });

  object.body.Essentials.x += dx1;
  object.body.Essentials.y += dy1;
  object.body.Essentials.width += dx2 - dx1;
  object.body.Essentials.height += dy2 - dy1;
};
