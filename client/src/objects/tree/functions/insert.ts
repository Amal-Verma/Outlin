import { node } from "@/types/object_types";

/**
 * Inserts a new node into the tree.
 * @param newNode - The new node to insert.
 * @param node - The parent node to insert the new node into.
 */
export const insertNode = (newNode: node, node: node, isGroup = false) => {
  for (let i = 0; i < node.children.length; i++) {
    if (node.children[i].body.contains(newNode.body)) {
      insertNode(newNode, node.children[i]);
      return;
    }
  }

  newNode.parent = node;

  if (!isGroup) {
    for (let i = 0; i < node.children.length; i++) {
      if (newNode.body.contains(node.children[i].body)) {
        newNode.children.push(node.children[i]);
        node.children[i].parent = newNode;
        node.children.splice(i, 1);
        i--;
      }
    }
  }

  node.children.push(newNode);
};
