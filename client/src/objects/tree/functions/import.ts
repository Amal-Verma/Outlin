import { tree, node, obj } from "@/types/object_types";
import Node from "@/objects/node/node";
import Rectangle from "@/objects/rectangle/rectangle";
import MultiSet from "@/objects/multiset/multiset";
import { insertNode } from "./insert";

type importedNode = {
  id: string,
  body: obj
};

type importedTree = {
  nodes: Array<importedNode>,
  edges: Array<{source: string, target: string}>,
  groupNodeId: string
};

export const importTree = (
  Tree: tree,
  jsonString: string,
  prefix: string,
  groupName: string
) => {
  const jsonObject: importedTree = JSON.parse(jsonString);

  console.log("Importing tree...");
  console.log("jsonObject:", jsonObject
  );

  const nodeMap = new Map<string, node>();

  // Create nodes with new IDs and add them to the nodeMap
  for (const importedNode of jsonObject.nodes) {
    const newBody = new Rectangle(0, 0, 100, 100);
    newBody.Essentials = importedNode.body.Essentials;
    newBody.attributes = importedNode.body.attributes;

    const newNode = new Node(newBody, groupName);
    newNode.id = prefix + importedNode.id;
    nodeMap.set(importedNode.id, newNode);
  }

  // Reconstruct the tree structure
  for (const edge of jsonObject.edges) {
    const parentNode = nodeMap.get(edge.source);
    const childNode = nodeMap.get(edge.target);
    if (parentNode && childNode) {
      parentNode.children.push(childNode);
      childNode.parent = parentNode;
    }
  }

  // Create a group node as the root of the mini tree
  let groupNode = nodeMap.get(jsonObject.groupNodeId);
  if (!groupNode) {
    groupNode = new Node(new Rectangle(0, 0, 100000, 100000));
    groupNode.id = prefix + jsonObject.groupNodeId;
    groupNode.children = Array.from(nodeMap.values());
  }
  groupNode.body.attributes.Colors["background-color"] =
          "rgba(0, 0, 0, 0)";
  groupNode.group = "root";
  groupNode.group_children = groupName;

  for (const node of nodeMap.values()) {
    Tree.objectMap.set(node.id, node);
  }
  
  const groupSet = new MultiSet(groupNode);
  for (const node of nodeMap.values()) {
    if (node !== groupNode) {
      groupSet.insert(node);
    }
  }

  Tree.groupMap.set(groupName, groupSet);

  // Insert the mini tree into the main tree
  insertNode(groupNode, Tree.root, true);

  Tree.generateObjects();
  console.log("Tree imported.");
};
