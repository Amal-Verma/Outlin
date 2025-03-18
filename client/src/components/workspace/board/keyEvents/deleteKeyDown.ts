import { tree, node } from '@/types/object_types';

export const handleDeleteKeyDown =  
(
  Tree: tree,
) => { 
  // Delete all selected objects from the tree
  const nodes: Array<node> = []
  Tree.selectedObject.forEach((node) => {
    Tree.objectMap.delete(node.id)
    Tree.groupMap.get(node.group)?.erase(node)
    Tree.delete(node);
    nodes.push(node)
  });

  Tree.addInstruction({type: "delete", nodes: nodes})

  // Deselect all objects and regenerate the tree objects
  Tree.selectedObject = [];
  Tree.generateObjects();
}