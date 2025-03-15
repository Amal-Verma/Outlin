import { RBTree } from "bintrees";
import { node } from "@/types/object_types";

// Interface for tree nodes
interface TreeNode {
  value: number;
  count: number;
}

export default class MultiSet {
  static offset = 1;

  private treeX: RBTree<TreeNode>;
  private treeY: RBTree<TreeNode>;
  private MapIdToNode: Map<
    string,
    { x: number; y: number; width: number; height: number }
  >;
  groupNode: node;
  nodes: Set<node>;
  length: number;

  constructor(
    groupNode: node,
    comparator: (a: number, b: number) => number = (a, b) => a - b
  ) {
    // Initialize two separate trees: one for x values and one for y values.
    this.groupNode = groupNode;
    this.treeX = new RBTree<TreeNode>((a, b) => comparator(a.value, b.value));
    this.treeY = new RBTree<TreeNode>((a, b) => comparator(a.value, b.value));
    this.MapIdToNode = new Map<
      string,
      { x: number; y: number; width: number; height: number }
    >();
    this.nodes = new Set<node>();
    this.length = 0;
  }

  // Insert a node into the multiset.
  insert(node: node): void {
    console.log("inserting into:", node.id);

    // Insert x and y values into the respective trees
    this.insertValue(this.treeX, node.body.attributes.Essentials.x);
    this.insertValue(this.treeY, node.body.attributes.Essentials.y);

    // Insert width and height values into the respective trees
    this.insertValue(
      this.treeX,
      node.body.attributes.Essentials.x + node.body.attributes.Essentials.width
    );
    this.insertValue(
      this.treeY,
      node.body.attributes.Essentials.y + node.body.attributes.Essentials.height
    );

    // Map node ID to its coordinates and dimensions
    this.MapIdToNode.set(node.id, {
      x: node.body.attributes.Essentials.x,
      y: node.body.attributes.Essentials.y,
      width: node.body.attributes.Essentials.width,
      height: node.body.attributes.Essentials.height,
    });

    this.length++;
    this.nodes.add(node);

    // Update the group node dimensions
    this.updateGroup();
  }

  // Delete one occurrence of the node from the multiset.
  erase(node: node, shouldUpdate: boolean = true): void {
    console.log("deleting from:", node.id);

    const nodeData = this.MapIdToNode.get(node.id);
    if (!nodeData) {
      return;
    }

    const { x, y, width, height } = nodeData;

    // Erase x and y values from the respective trees
    this.eraseValue(this.treeX, x);
    this.eraseValue(this.treeY, y);

    // Erase width and height values from the respective trees
    this.eraseValue(this.treeX, x + width);
    this.eraseValue(this.treeY, y + height);

    this.MapIdToNode.delete(node.id);

    this.length--;
    this.nodes.delete(node);

    // Update the group node dimensions if required
    if (shouldUpdate) this.updateGroup();
  }

  // Update the group node dimensions based on the current nodes
  updateGroup() {
    let [minX, minY] = this.getMin();
    let [maxX, maxY] = this.getMax();

    if (minX === null || minY === null || maxX === null || maxY === null) {
      minX = minY = maxX = maxY = 0;
    }

    minX -= MultiSet.offset;
    minY -= MultiSet.offset;
    maxX += MultiSet.offset;
    maxY += MultiSet.offset;

    this.groupNode.body.attributes.Essentials.x = minX || 0;
    this.groupNode.body.attributes.Essentials.y = minY || 0;
    this.groupNode.body.attributes.Essentials.width = (maxX || 0) - (minX || 0);
    this.groupNode.body.attributes.Essentials.height = (maxY || 0) - (minY || 0);
  }

  // Update a node in the multiset
  update(node: node) {
    console.log("updating:", node.id);

    // First, erase the old node data
    this.erase(node, false);

    // Then, insert the updated node data
    this.insert(node);
  }

  // Returns the minimum x and minimum y as a tuple.
  getMin(): [number | null, number | null] {
    const minX = this.treeX.min();
    const minY = this.treeY.min();
    return [minX ? minX.value : null, minY ? minY.value : null];
  }

  // Returns the maximum x and maximum y as a tuple.
  getMax(): [number | null, number | null] {
    const maxX = this.treeX.max();
    const maxY = this.treeY.max();
    return [maxX ? maxX.value : null, maxY ? maxY.value : null];
  }

  // Helper method to insert a value into a given tree.
  private insertValue(tree: RBTree<TreeNode>, val: number): void {
    // Since the comparator uses only the "value" property,
    // the count is a dummy value for search purposes.
    const node = tree.find({ value: val, count: 0 });
    if (node) {
      node.count++;
    } else {
      tree.insert({ value: val, count: 1 });
    }
  }

  // Helper method to delete one occurrence of a value from a given tree.
  private eraseValue(tree: RBTree<TreeNode>, val: number): void {
    const node = tree.find({ value: val, count: 0 });
    if (node) {
      if (node.count > 1) {
        node.count--;
      } else {
        tree.remove(node);
      }
    }
  }
}
