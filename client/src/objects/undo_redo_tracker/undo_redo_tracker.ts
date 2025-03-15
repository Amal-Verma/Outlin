/**
 * Represents a tracker for undo and redo operations.
 * 
 * @property {Array<any>} undo_queue - Queue containing operations that can be undone.
 * @property {Array<any>} redo_queue - Queue containing operations that can be redone.
 */
export default class UndoRedoTracker {
  undo_queue: Array<any>;
  redo_queue: Array<any>;

  /**
   * Creates an instance of UndoRedoTracker.
   */
  constructor() {
    this.undo_queue = [];
    this.redo_queue = [];
  }
}
