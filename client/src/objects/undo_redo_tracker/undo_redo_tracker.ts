import { tree } from "@/types/object_types";
import { instruction } from "@/types/undo_redo_instructions_types";
import MultiSet from "../multiset/multiset";
import Denque from "denque";

/**
 * Represents a tracker for undo and redo operations.
 * 
 * @property {Denque<any>} undo_queue - Queue containing operations that can be undone.
 * @property {Denque<any>} redo_queue - Queue containing operations that can be redone.
 * @property {tree} Tree - Reference to the tree object.
 * @property {number} max_size - Maximum size of the undo queue.
 */
export default class UndoRedoTracker {
  undo_queue: Denque<instruction>;
  redo_queue: Denque<instruction>;
  Tree: tree;
  max_size: number = 20;

  /**
   * Creates an instance of UndoRedoTracker.
   */
  constructor(Tree: tree) {
    this.undo_queue = new Denque<instruction>();
    this.redo_queue = new Denque<instruction>();
    this.Tree = Tree;
  }

  /**
   * 
   * Complements the instruction with the necessary information to be able to undo it.
   * @param instruction 
   */
  completeInstruction(instr: instruction): instruction {
    switch (instr.type) {
      case "create":
        return {type: "delete", nodes: instr.nodes};
      case "delete":
        return {type: "create", nodes: instr.nodes};
      case "attribute":
        return {type: "attribute", changes: instr.changes.map(change => {
          return {
            id: change.id,
            attribute_group: change.attribute_group,
            attribute: change.attribute,
            previous_value: change.next_value,
            next_value: change.previous_value
          };
        }
        )};
    }
  }


  processInstruction(instr: instruction) {
    if (instr.type === "create") {
      instr.nodes.forEach(node => {
        this.Tree.objectMap.set(node.id, node);

        if (node.group_children){
          this.Tree.groupMap.set(node.group, new MultiSet(node));
        }

        this.Tree.groupMap.get(node.group)?.insert(node);
        this.Tree.insert(node);
      });
      this.Tree.generateObjects();

    } else if (instr.type === "delete") {
      instr.nodes.forEach(node => {
        console.log("undo redo delete node", node.id);
        this.Tree.objectMap.delete(node.id);
        
        if (node.group_children){
          this.Tree.groupMap.delete(node.group);
        }

        this.Tree.groupMap.get(node.group)?.erase(node);
        this.Tree.delete(node);
      });
      this.Tree.generateObjects();
      
    } else if (instr.type === "attribute") {
      instr.changes.forEach(change => {
        const node = this.Tree.objectMap.get(change.id);
        if (node) {
          node.body.attributes[change.attribute_group][change.attribute] = change.next_value;
        }
      });
    }
  }

  /**
   * 
   * Adds an instruction to the undo queue.
   * @param instr 
   */
  addInstruction(instr: instruction) {
    this.undo_queue.push(instr);
    this.redo_queue.clear();
    if (this.undo_queue.length > this.max_size) {
      this.undo_queue.shift();
    }
  }

  /**
   * 
   * Performs the undo operation.
   */
  undo(){
    const lastInstruction = this.undo_queue.pop();
    if (lastInstruction) {
      this.processInstruction(this.completeInstruction(lastInstruction));
      this.redo_queue.push(lastInstruction)
    }
  }

  /**
   * 
   * Performs the redo operation.
   */
  redo(){
    const lastInstruction = this.redo_queue.pop();
    if (lastInstruction) {
      this.processInstruction(lastInstruction);
      this.undo_queue.push(lastInstruction);
    }
  }

  

}
