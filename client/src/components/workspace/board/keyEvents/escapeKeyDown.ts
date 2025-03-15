import { tree } from '@/types/object_types';

export const handleEscapeKeyDown =  
(
  Tree: tree,
) => { 
  // Deselect all objects in the tree
  Tree.selectedObject = [];
}