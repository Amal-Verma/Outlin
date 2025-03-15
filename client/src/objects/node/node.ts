import { obj } from "@/types/object_types";

/**
 * Represents a node in a tree structure.
 *
 * @property {number} idCounter - Counter to generate unique IDs for each node.
 * @property {number} id - Unique identifier for the node.
 * @property {obj} body - The body of the node, containing its data.
 * @property {Node | null} parent - The parent node of this node. Null if this node is the root.
 * @property {Array<Node>} children - The children nodes of this node.
 * @property {string} group - The group to which this node belongs.
 * @param body - The data to be stored in the node.
 * @param group - The group to which this node belongs.
 * @param group_children - The group name if this node is a group node else null.
 */
export default class Node {
  static idCounter = 0;
  id: string;
  body: obj;
  parent: Node | null;
  children: Array<Node>;
  group: string;
  group_children: string | null;

  constructor(body: obj, group: string = "root", group_children: string | null = null) {
    this.id = Node.idCounter.toString();
    this.body = body;
    this.parent = null;
    this.children = [];
    this.group = group;
    this.group_children = group_children;

    Node.idCounter++;
  }
}
