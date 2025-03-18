import { tree, node } from "@/types/object_types";
import cloneDeep from "lodash/cloneDeep";

import { createNode } from "./createNode";
import { insertNode } from "./insert";

/**
 * Pastes copied objects into the tree.
 * @param Tree - The tree to paste objects into.
 * @param copyObjects - The array of copied objects to paste.
 */

let pasteCount = 0;

export const pasteCopiedObjects = (Tree: tree) => {
  Tree.selectedObject = [];
  const nodes: Array<node> = [];

  Tree.copyObjects.map((obj) => {
    const newNode = createNode(Tree, cloneDeep(obj));
    Tree.selectedObject.push(newNode);
    insertNode(newNode, Tree.root);
    nodes.push(newNode);
  });

  Tree.groupObjects(`paste-${pasteCount}`);
  pasteCount++;

  nodes.push(Tree.selectedObject[0]);
  Tree.undo_redo_tracker.addInstruction({type: "create", nodes: nodes});
};
