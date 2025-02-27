import MultiSet from "../objects/multiset/multiset";
import Node from "../objects/node/node";
import Rectangle from "../objects/rectangle/rectangle";

describe("MultiSet", () => {
  let multiSet: MultiSet;
  let groupNode: Node;

  beforeEach(() => {
    groupNode = new Node(new Rectangle(0, 0, 100, 100), "group");
    multiSet = new MultiSet(groupNode);
  });

  test("should insert nodes correctly", () => {
    const node1 = new Node(new Rectangle(10, 10, 20, 20), "group");
    multiSet.insert(node1);

    expect(multiSet.getMin()).toEqual([10, 10]);
    expect(multiSet.getMax()).toEqual([30, 30]);
  });

  test("should erase nodes correctly", () => {
    const node1 = new Node(new Rectangle(10, 10, 20, 20), "group");
    multiSet.insert(node1);
    multiSet.erase(node1);

    expect(multiSet.getMin()).toEqual([null, null]);
    expect(multiSet.getMax()).toEqual([null, null]);
  });

  test("should update nodes correctly", () => {
    const node1 = new Node(new Rectangle(10, 10, 20, 20), "group");
    multiSet.insert(node1);

    node1.body.Essentials.x = 15;
    node1.body.Essentials.y = 15;
    multiSet.update(node1);

    expect(multiSet.getMin()).toEqual([15, 15]);
    expect(multiSet.getMax()).toEqual([35, 35]);
  });

  test("should update group node correctly", () => {
    const node1 = new Node(new Rectangle(10, 10, 20, 20), "group");
    const node2 = new Node(new Rectangle(30, 30, 20, 20), "group");
    multiSet.insert(node1);
    multiSet.insert(node2);

    expect(groupNode.body.Essentials.x).toBe(9);
    expect(groupNode.body.Essentials.y).toBe(9);
    expect(groupNode.body.Essentials.width).toBe(42);
    expect(groupNode.body.Essentials.height).toBe(42);
  });

  test("should update group node correctly with repeated updates", () => {
    const node1 = new Node(new Rectangle(10, 10, 20, 20), "group");
    const node2 = new Node(new Rectangle(30, 30, 20, 20), "group");
    multiSet.insert(node1);
    multiSet.insert(node2);

    node1.body.Essentials.x = 5;
    node1.body.Essentials.y = 5;
    node1.body.Essentials.width = 25;
    node1.body.Essentials.height = 25;
    multiSet.update(node1);

    expect(groupNode.body.Essentials.x).toBe(4);
    expect(groupNode.body.Essentials.y).toBe(4);
    expect(groupNode.body.Essentials.width).toBe(47);
    expect(groupNode.body.Essentials.height).toBe(47);

    node1.body.Essentials.x = 15;
    node1.body.Essentials.y = 15;
    node1.body.Essentials.width = 30;
    node1.body.Essentials.height = 30;
    multiSet.update(node1);

    expect(groupNode.body.Essentials.x).toBe(14);
    expect(groupNode.body.Essentials.y).toBe(14);
    expect(groupNode.body.Essentials.width).toBe(37);
    expect(groupNode.body.Essentials.height).toBe(37);
  });

  test("should handle complex sequence of insertions and deletions", () => {
    const nodes = [
      new Node(new Rectangle(10, 10, 20, 20), "group"),
      new Node(new Rectangle(30, 30, 20, 20), "group"),
      new Node(new Rectangle(50, 50, 20, 20), "group"),
      new Node(new Rectangle(70, 70, 20, 20), "group"),
      new Node(new Rectangle(90, 90, 20, 20), "group")
    ];

    nodes.forEach(node => multiSet.insert(node));
    expect(multiSet.getMin()).toEqual([10, 10]);
    expect(multiSet.getMax()).toEqual([110, 110]);

    multiSet.erase(nodes[0]);
    multiSet.erase(nodes[1]);
    multiSet.erase(nodes[2]);
    expect(multiSet.getMin()).toEqual([70, 70]);
    expect(multiSet.getMax()).toEqual([110, 110]);

    const moreNodes = [
      new Node(new Rectangle(5, 5, 10, 10), "group"),
      new Node(new Rectangle(15, 15, 10, 10), "group"),
      new Node(new Rectangle(25, 25, 10, 10), "group"),
      new Node(new Rectangle(35, 35, 10, 10), "group"),
      new Node(new Rectangle(45, 45, 10, 10), "group"),
      new Node(new Rectangle(55, 55, 10, 10), "group")
    ];

    moreNodes.forEach(node => multiSet.insert(node));
    expect(multiSet.getMin()).toEqual([5, 5]);
    expect(multiSet.getMax()).toEqual([110, 110]);

    multiSet.erase(moreNodes[0]);
    multiSet.erase(moreNodes[1]);
    multiSet.erase(moreNodes[2]);
    multiSet.erase(moreNodes[3]);
    multiSet.erase(moreNodes[4]);
    expect(multiSet.getMin()).toEqual([55, 55]);
    expect(multiSet.getMax()).toEqual([110, 110]);

    multiSet.erase(nodes[3]);
    multiSet.erase(nodes[4]);
    multiSet.erase(moreNodes[5]);
    expect(multiSet.getMin()).toEqual([null, null]);
    expect(multiSet.getMax()).toEqual([null, null]);
  });
});
