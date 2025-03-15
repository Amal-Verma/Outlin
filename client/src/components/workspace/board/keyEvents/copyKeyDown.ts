import { tree } from '@/types/object_types';

export const handleCopyKeyDown =  
(
  Tree: tree,
  scale: number,
) => { 
  // Copy selected objects with an offset
  Tree.copySelectedObjects(10/scale, 10/scale);
}
