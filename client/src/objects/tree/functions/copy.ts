import { node, obj, tree } from "@/types/object_types";
import cloneDeep from "lodash/cloneDeep";

/**
 * Copies the selected objects and offsets their positions.
 * @param selectedObjects - The array of selected nodes to copy.
 * @param offsetX - The x-offset to apply to the copied objects.
 * @param offsetY - The y-offset to apply to the copied objects.
 * @returns An array of copied objects with updated positions.
 */
export const copySelectedObjects = (
  Tree: tree,
  selectedObjects: Array<node> | Set<node>,
  offsetX: number,
  offsetY: number
): Array<obj> => {
  const copyObjects: Array<obj> = [];
  
  Array.from(selectedObjects).forEach((node) => {
    if (node.group_children) {
      const groupNodes = Tree.groupMap.get(node.group_children)?.nodes;
      if (groupNodes) {
        const copiedGroupNodes = copySelectedObjects(Tree, groupNodes, offsetX, offsetY);
        copyObjects.push(...copiedGroupNodes);
      };

    } else {
      const obj = cloneDeep(node.body);
      obj.Essentials.x += offsetX;
      obj.Essentials.y += offsetY;
      copyObjects.push(obj);
    }
  });

  console.log("Copied objects: ", copyObjects, selectedObjects);

  return copyObjects;
};
