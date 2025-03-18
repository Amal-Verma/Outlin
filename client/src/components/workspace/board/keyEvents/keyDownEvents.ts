import { tree } from '@/types/object_types';

import { handleEscapeKeyDown } from './escapeKeyDown';
import { handleDeleteKeyDown } from './deleteKeyDown';
import { handleCopyKeyDown } from './copyKeyDown';
import { handlePasteKeyDown } from './pasteKeyDown';

export const handleKeyDownEvents = 
async (
  e: KeyboardEvent,
  Tree: tree,
  scale: number,

  forceRenderWorkspace: () => void,
) => {  
  switch (e.key) {
    case 'Delete':
      e.preventDefault();
      console.log("delete pressed");
      handleDeleteKeyDown(Tree);
      break;
    case 'Escape':
      e.preventDefault();
      console.log("escape pressed");
      handleEscapeKeyDown(Tree);
      break;
    case 'Enter':
      e.preventDefault();
      console.log("enter pressed");
      // Add enter logic here
      break;
    case 'c':
      e.preventDefault();
      if (e.ctrlKey) {
        console.log("ctrl + c pressed");
        handleCopyKeyDown(Tree, scale);
      }
      break;
    case 'v':
      e.preventDefault();
      if (e.ctrlKey) {
        console.log("ctrl + v pressed");
        handlePasteKeyDown(Tree);
      }
      break;      
    case 'z':
      e.preventDefault();
      if (e.ctrlKey) {
        console.log("ctrl + z pressed");
        console.log("Tree undo redo tracer", Tree.undo_redo_tracker);
        Tree.undo();
      }
      break;
    case 'y':
      e.preventDefault();
      if (e.ctrlKey) {
        console.log("ctrl + y pressed");
        Tree.redo();
      }
      break;
    default:
      break;
  }

  // Force re-render workspace
  forceRenderWorkspace();

}