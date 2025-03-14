import { obj, node, rectangle, multiset } from "@/types";
import Rectangle from "@/objects/rectangle/rectangle";
import Node from "../node/node";
import MultiSet from "../multiset/multiset";

import { insertNode } from "./functions/insert";
import { deleteNode } from "./functions/delete";
import { generateObjects } from "./functions/generateObjects";
import { copySelectedObjects } from "./functions/copy";
import { pasteCopiedObjects } from "./functions/paste";
import { selectRange } from "./functions/selectRange";

import { exportTree } from "./functions/export";
import { importTree } from "./functions/import";

import { createNode } from "./functions/createNode";
import { normalize } from "./functions/normalize";
import { groupObjects } from "./functions/groupObjects";

/**
 * Represents a tree structure containing nodes and various operations on them.
 *
 * @property {node} root - The root node of the tree.
 * @property {Array<{ node: node, id: string }>} objects - An array of objects in the tree, each containing a node and its ID.
 * @property {Array<obj>} copyObjects - An array of objects that have been copied.
 * @property {Array<node>} selectedObject - An array of nodes that are currently selected.
 * @property {Map<number, node>} objectMap - A map of node IDs to nodes.
 * @property {Map<string, multiset>} groupMap - A map of group names to multisets.
 */
export default class Tree {
  root: node;
  objects: Array<{ node: node; id: string }>;
  copyObjects: Array<obj>;
  selectedObject: Array<node>;
  objectMap: Map<string, node>;
  groupMap: Map<string, multiset>;

  /**
   * Creates an instance of Tree.
   */
  constructor() {
    this.objects = [];
    this.copyObjects = [];
    this.selectedObject = [];
    this.objectMap = new Map<string, node>();
    this.groupMap = new Map<string, multiset>();

    if (typeof window === undefined) {
      this.root = createNode(
        this, 
        new Rectangle(0, 0, 100000, 100000), 
        "root", 
        "root"
      );
    } else {
      this.root = createNode(
        this,
        new Rectangle(0, 0, window.innerWidth, window.innerHeight),
        "root",
        "root"
      );
    }

    if (typeof window !== undefined) {
      this.insert(
        createNode(
          this,
          new Rectangle(0, 0, window.innerWidth / 10, window.innerHeight / 10),
          "root"
        )
      );
      this.insert(
        createNode(
          this,
          new Rectangle(
            window.innerWidth / 10,
            0,
            window.innerWidth / 10,
            window.innerHeight / 10
          ),
          "root"
        )
      );
    }

    console.log("Tree created");
  }

  /**
   * Deletes a node from the tree.
   * @param node - The node to be deleted.
   */
  delete(node: node) {
    this.groupMap.get(node.group)?.erase(node);
    deleteNode(node);
  }

  /**
   * Inserts a new node into the tree.
   * @param newObj - The node to be inserted.
   */
  insert(newObj: node) {
    const group = newObj.group;
    // if (group) {
    if (!this.groupMap.has(group)) {
      const newGroup = createNode(
        this,
        new Rectangle(0, 0, window.innerWidth, window.innerHeight),
        "root",
        group
      );
      newGroup.body.attributes.Colors["background-color"] = "rgba(0, 0, 0, 0)";

      this.groupMap.get("root")?.insert(newGroup);
      this.groupMap.set(group, new MultiSet(newGroup));
      const groupNode = this.groupMap.get(group)?.groupNode;
      if (groupNode) {
        insertNode(groupNode, this.root, true);
      }
    }
    const groupNode = this.groupMap.get(group)?.groupNode;
    if (groupNode) {
      this.groupMap.get(group)?.insert(newObj);
      insertNode(newObj, groupNode);
    }
    // } else {
    //   insertNode(newObj, this.root);
    // }
    this.generateObjects();
  }

  /**
   * Normalizes the selected objects in the tree.
   */
  normalize() {
    console.log("normalizing");
    normalize(this.selectedObject, this.groupMap);
  }

  /**
   * Generates the objects in the tree.
   */
  generateObjects() {
    this.objects = generateObjects(this.root);
  }

  /**
   * Copies the selected objects with an offset.
   * @param offsetX - The x offset for the copied objects.
   * @param offsetY - The y offset for the copied objects.
   */
  copySelectedObjects(offsetX: number, offsetY: number) {
    this.copyObjects = copySelectedObjects(
      this,
      this.selectedObject,
      offsetX,
      offsetY
    );
  }

  /**
   * Pastes the copied objects into the tree.
   */
  pasteCopiedObjects() {
    pasteCopiedObjects(this);
  }

  /**
   * Selects a range of objects in the tree.
   * @param selection - The rectangle defining the selection range.
   */
  selectRange(selection: rectangle) {
    this.selectedObject = [];
    selectRange(this.root, this.selectedObject, selection);
  }

  /**
   * Exports the tree to a JSON string.
   * @returns The JSON string of the tree.
   */
  exportTree(): string {
    console.log("exporting tree");
    console.log(exportTree(this))
    return exportTree(this);
  }

  /**
   * Imports a tree from a JSON string.
   * @param jsonString - The JSON string representing the tree.
   * @param prefix - The prefix to be added to node IDs.
   * @param groupName - The group name for the imported tree.
   */
  importTree(jsonString: string, prefix: string, groupName: string) {
    importTree(this, jsonString, prefix, groupName);
  }

  /**
   * Groups the selected objects into a new group.
   * @param groupName - The name of the new group.
   */
  groupObjects(groupName: string) {
    groupObjects(this, groupName);
  }
}
