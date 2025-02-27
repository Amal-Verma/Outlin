import { node, obj } from "@/types";
import cloneDeep from "lodash/cloneDeep";

/**
 * Copies the selected objects and offsets their positions.
 * @param selectedObjects - The array of selected nodes to copy.
 * @param offsetX - The x-offset to apply to the copied objects.
 * @param offsetY - The y-offset to apply to the copied objects.
 * @returns An array of copied objects with updated positions.
 */
export const copySelectedObjects = (
  selectedObjects: Array<node>,
  offsetX: number,
  offsetY: number
): Array<obj> => {
  const copyObjects = selectedObjects.map((node) => {
    const obj = cloneDeep(node.body);
    obj.Essentials.x += offsetX;
    obj.Essentials.y += offsetY;
    return obj;
  });
  return copyObjects;
};
