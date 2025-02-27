import Node from "../objects/node/node";
import Rectangle from "../objects/rectangle/rectangle";

describe("Node", () => {
  test("should initialize correctly", () => {
    const rect = new Rectangle(10, 20, 30, 40);
    const node = new Node(rect, "group");
    expect(node.body).toBe(rect);
    expect(node.group).toBe("group");
    expect(node.children.length).toBe(0);
  });

  test("should increment id correctly", () => {
    const rect1 = new Rectangle(10, 20, 30, 40);
    const node1 = new Node(rect1, "group");
    const rect2 = new Rectangle(50, 60, 70, 80);
    const node2 = new Node(rect2, "group");
    expect(node2.id).toBe(node1.id + 1);
  });

  test("should add children correctly", () => {
    const rect1 = new Rectangle(10, 20, 30, 40);
    const parent = new Node(rect1, "group");
    const rect2 = new Rectangle(50, 60, 70, 80);
    const child = new Node(rect2, "group");
    parent.children.push(child);
    child.parent = parent;
    expect(parent.children.length).toBe(1);
    expect(child.parent).toBe(parent);
  });
});
