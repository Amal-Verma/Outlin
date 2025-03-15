import Rectangle from "@/objects/rectangle/rectangle";
import Node from "@/objects/node/node";
import Tree from "@/objects/tree/tree";
import MultiSet from "@/objects/multiset/multiset";

export type rectangle = Rectangle;
export type obj = Rectangle;
export type node = Node;
export type tree = Tree;
export type multiset = MultiSet;

export type group = {[key: string]: string | number};
export type essentials = {
  [key: string]: string | number;
  'tag': string;
  'x': number;
  'y': number;
  'width': number;
  'height': number;
  'text': string;
}
export type attributes = {
  "Essentials": essentials,
  [key: string]: group;};


// fix this
export type getAttributeDetailType = 
{ 
  default: string,
  ui: {
    [key: string]: string | number | string[];
    'type': string,
  },
  react: {
    code: ((value: string) => string),
  }
} |
{ 
  default: number,
  ui: {
    [key: string]: string | number | string[];
    'type': string,
  },
  react: {
    code: ((value: number) => string),
  }
};
