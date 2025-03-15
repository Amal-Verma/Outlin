import { node, rectangle } from "@/types/object_types";

/**
 * Recursively selects all nodes under the root node.
 * @param root - The root node to start selection from.
 * @param selectedObject - The array to store selected nodes.
 */
const selectAll = (root: node, selectedObject: Array<node>): void => {
  selectedObject.push(root);

  root.children.forEach((child) => {
    selectAll(child, selectedObject);
  });
};

/**
 * Selects nodes within a specified rectangular range.
 * @param root - The root node to start selection from.
 * @param selectedObject - The array to store selected nodes.
 * @param selection - The rectangular range for selection.
 */
export const selectRange = (
  root: node,
  selectedObject: Array<node>,
  selection: rectangle
) => {
  if (selection.contains(root.body)) {
    selectAll(root, selectedObject);
  } else {
    root.children.forEach((child) => {
      selectRange(child, selectedObject, selection);
    });
  }
};
