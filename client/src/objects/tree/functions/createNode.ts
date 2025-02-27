import { obj, node, tree } from "@/types";
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
  group: string = "root"
): node => {
  const newNode = new Node(obj, group);
  Tree.objectMap.set(newNode.id, newNode);
  return newNode;
};
