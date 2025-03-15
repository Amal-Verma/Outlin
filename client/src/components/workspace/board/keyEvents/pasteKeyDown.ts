import { tree } from '@/types/object_types';

export const handlePasteKeyDown =  
(
  Tree: tree,
) => { 
  // Paste copied objects and generate new objects in the tree
  Tree.pasteCopiedObjects();
  Tree.generateObjects();
}
