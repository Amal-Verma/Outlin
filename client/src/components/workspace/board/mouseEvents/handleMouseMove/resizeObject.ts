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

  selectedObject = getGroupNodes(Tree, selectedObject);

  // Resize all selected object except object
  selectedObject.forEach((node) => {
    if (node.body === object.body) return;
    if (!object.body.contains(node.body)) return;

    const dw =
      (object.body.attributes.Essentials.width + dx2 - dx1) / object.body.attributes.Essentials.width;
    const dh =
      (object.body.attributes.Essentials.height + dy2 - dy1) /
      object.body.attributes.Essentials.height;

    const ndx1 =
      object.body.attributes.Essentials.x -
      node.body.attributes.Essentials.x +
      dx1 +
      (node.body.attributes.Essentials.x - object.body.attributes.Essentials.x) * dw;

    const ndy1 =
      object.body.attributes.Essentials.y -
      node.body.attributes.Essentials.y +
      dy1 +
      (node.body.attributes.Essentials.y - object.body.attributes.Essentials.y) * dh;

    node.body.attributes.Essentials.x += ndx1;
    node.body.attributes.Essentials.y += ndy1;
    node.body.attributes.Essentials.width = node.body.attributes.Essentials.width * dw;
    node.body.attributes.Essentials.height = node.body.attributes.Essentials.height * dh;
  });

  object.body.attributes.Essentials.x += dx1;
  object.body.attributes.Essentials.y += dy1;
  object.body.attributes.Essentials.width += dx2 - dx1;
  object.body.attributes.Essentials.height += dy2 - dy1;
};
