import { node } from "@/types/object_types";

/**
 * Generates an array of objects from the tree.
 * @param root - The root node of the tree.
 * @returns An array of objects with nodes and their IDs.
 */
export const generateObjects = (root: node) => {
  const objects: Array<{ node: node; id: string }> = [];

  const generateObjectsHelper = (node: node) => {
    if (node !== root) {
      objects.push({ node: node, id: node.id });
    }
    for (let i = 0; i < node.children.length; i++) {
      generateObjectsHelper(node.children[i]);
    }
  };

  generateObjectsHelper(root);
  return objects;
};
