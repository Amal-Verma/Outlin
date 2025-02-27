import { node } from "@/types";

/**
 * Deletes a node from the tree.
 * @param node - The node to delete.
 */
export const deleteNode = (node: node) => {
  for (let i = 0; i < node.children.length; i++) {
    node.children[i].parent = node.parent;
  }

  const parent = node.parent;

  if (parent) {
    parent.children = parent.children.filter((child) => child !== node);
    parent.children = parent.children.concat(node.children);
  }

  node.children = [];
  node.parent = null;
};
