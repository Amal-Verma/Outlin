import { obj, node, tree } from "@/types/object_types";
import Node from "@/objects/node/node";

/**
 * Creates a new node in the tree.
 * @param Tree - The tree to add the node to.
 * @param obj - The object to create the node from.
 * @param group - The group name for the node (default is 'root').
 * @returns The created node from rectangle.
 */
export const createNode = (
  Tree: tree,
  obj: obj,
  group: string = "root",
  group_children: string | null = null
): node => {
  const newNode = new Node(obj, group, group_children);
  Tree.objectMap.set(newNode.id, newNode);
  return newNode;
};
