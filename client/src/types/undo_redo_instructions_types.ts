import { node } from "./object_types";

export type create_instruction = {
  type: "create";
  nodes: Array<node>;
};

export type delete_instruction = {
  type: "delete";
  nodes: Array<node>;
};

export type attribute_change = {
  id: string;
  attribute_group: string;
  attribute: string;
  previous_value: string | number;
  next_value: string | number;
}

export type attribute_instruction = {
  type: "attribute";
  changes: Array<attribute_change>;
};

export type instruction =
  | create_instruction
  | delete_instruction
  | attribute_instruction;
