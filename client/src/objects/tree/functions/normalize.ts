import { node, multiset } from "@/types";

/**
 * Normalizes the selected objects and updates the group map.
 * @param selectedObject - The array of selected nodes to normalize.
 * @param groupMap - The map of groups to update.
 */
export const normalize = (
  selectedObject: Array<node>,
  groupMap: Map<string, multiset>
) => {
  selectedObject.forEach((obj) => {
    const groupNodes = groupMap.get(obj.group)?.nodes;
    if (groupMap.get(obj.group)?.groupNode !== obj) {
      obj.body.normalize();
      groupMap.get(obj.group)?.update(obj);
    } else if (groupNodes) {
      normalize(Array.from(groupNodes), groupMap);
    }
  });
};
