import { obj, tree } from "@/types";
import cloneDeep from "lodash/cloneDeep";

import { createNode } from "./createNode";
import { insertNode } from "./insert";

/**
 * Pastes copied objects into the tree.
 * @param Tree - The tree to paste objects into.
 * @param copyObjects - The array of copied objects to paste.
 */
export const pasteCopiedObjects = (Tree: tree, copyObjects: Array<obj>) => {
  Tree.selectedObject = [];
  copyObjects.map((obj) => {
    const newNode = createNode(Tree, cloneDeep(obj));
    Tree.selectedObject.push(newNode);
    insertNode(newNode, Tree.root);
  });
};
