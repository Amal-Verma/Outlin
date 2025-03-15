import { tree } from '@/types/object_types';

export const handleDeleteKeyDown =  
(
  Tree: tree,
) => { 
  // Delete all selected objects from the tree
  Tree.selectedObject.forEach((node) => {
    Tree.delete(node);
  });

  // Deselect all objects and regenerate the tree objects
  Tree.selectedObject = [];
  Tree.generateObjects();
}