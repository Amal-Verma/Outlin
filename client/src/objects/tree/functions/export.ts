import { tree, node, obj } from "@/types";

type newNode = {
  id: string,
  body: obj
}

export const exportTree = (
  Tree: tree  
): string => {

  const jsonObject: {nodes: Array<newNode>, edges: Array<{source: string, target: string}>, groupNodeId: string} = {nodes: [], edges: [], groupNodeId: Tree.root.id};

  const root = Tree.root;

  const convertNode = (node: node) => {
    const newNode: newNode = {id: node.id, body: node.body};
    return newNode;
  }

  const dfs = (node: node, parentid: string = "no_it_is_root") => {
    // if (Tree.groupMap.get(node.group)?.groupNode !== node) {
    if (!node.group_children) {
      jsonObject.nodes.push(convertNode(node));
      if (parentid !== "no_it_is_root")
      jsonObject.edges.push({source: parentid, target: node.id});
    }
    for (const child of node.children) {
      dfs(child, node.id);
    }
  }

  dfs(root);

  const jsonStr = JSON.stringify(jsonObject);
  
  return jsonStr;

};
