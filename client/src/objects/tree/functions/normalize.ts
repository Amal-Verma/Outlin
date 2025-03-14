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
    if (!obj.group_children) {
      obj.body.normalize();
      groupMap.get(obj.group)?.update(obj);
    } 
    else {
      const groupNodes = groupMap.get(obj.group_children)?.nodes;
      if (groupNodes){
        normalize(Array.from(groupNodes), groupMap);
      }
    }
  });
};
