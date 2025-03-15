import { obj, tree } from "@/types/object_types";
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
  Tree.copyObjects.map((obj) => {
    const newNode = createNode(Tree, cloneDeep(obj));
    Tree.selectedObject.push(newNode);
    insertNode(newNode, Tree.root);
  });

  Tree.groupObjects(`paste-${pasteCount}`);
  pasteCount++;
};
