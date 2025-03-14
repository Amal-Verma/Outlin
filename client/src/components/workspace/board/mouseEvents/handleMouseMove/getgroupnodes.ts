import { node, tree }  from "@/types";

export const getGroupNodes = (
  Tree: tree,
  objects: Array<node>
): Array<node> => {
  let nodes = [...objects];
  let idx = 0;
  while (idx < nodes.length) {
    const node = nodes[idx];
    if (node.group_children) {
      const groupNodes = Tree.groupMap.get(node.group_children)?.nodes;
      if (groupNodes) {
        nodes.push(...groupNodes);
      }
    }
    idx++;
  }

  return nodes;
}