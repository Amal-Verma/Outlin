import { tree, node } from "@/types";
import Rectangle from "@/objects/rectangle/rectangle";
import MultiSet from "@/objects/multiset/multiset";
import { createNode } from "./createNode";
import { insertNode } from "./insert";

export const groupObjects = (
  Tree: tree,
  groupName: string,
  selectedObject: Array<node> = Tree.selectedObject

) => {
  const selectedNodes = selectedObject.filter(node => node.group === "root");

  if (selectedNodes.length === 0) {
    console.log("No objects selected to group.");
    return;
  }

  // Create a new group node
  const groupNode = createNode(Tree, new Rectangle(0, 0, 100, 100), "root", groupName);
  groupNode.body.attributes.Colors["background-color"] =
          "rgba(0, 0, 0, 0)";
  
  Tree.groupMap.get("root")?.insert(groupNode)

  // Create a new MultiSet for the group
  const groupSet = new MultiSet(groupNode);

  // Update the group of each selected node and add to the group set
  for (const node of selectedNodes) {
    Tree.groupMap.get(node.group)?.erase(node);
    node.group = groupName;
    groupSet.insert(node);
  }

  // Update the Tree's groupMap
  Tree.groupMap.set(groupName, groupSet);

  for(const node of selectedNodes) {
    // Remove the selected node from the parent's children
    if (node.parent) {
      const index = node.parent.children.indexOf(node);
      if (index > -1) {
        node.parent.children.splice(index, 1);
      }
      node.parent = null;
      insertNode(node, groupNode, false);
    }
  }

  // Insert the group node into the main tree
  insertNode(groupNode, Tree.root, true);

  Tree.selectedObject = [groupNode];
  Tree.generateObjects();

  console.log(`Grouped ${selectedNodes.length} objects into group '${groupName}'.`);

  console.log("Grouped objects:", selectedNodes);
  console.log(Tree);
};
