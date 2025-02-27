// import Tree from "../objects/tree/tree";
// import Node from "../objects/node/node";
// import Rectangle from "../objects/rectangle/rectangle";

// describe("Tree", () => {
//   let tree: Tree;

//   beforeEach(() => {
//     tree = new Tree();
//   });

//   test("should initialize correctly", () => {
//     expect(tree.root).toBeDefined();
//     expect(tree.objects.length).toBeGreaterThan(0);
//   });

//   test("should insert nodes correctly", () => {
//     const node = new Node(new Rectangle(10, 10, 20, 20), "group");
//     tree.insert(node);

//     expect(tree.objectMap.has(node.id)).toBe(true);
//     expect(tree.groupMap.get("group")?.groupNode.children.length).toBe(1);
//   });

//   test("should delete nodes correctly", () => {
//     const node = new Node(new Rectangle(10, 10, 20, 20), "group");
//     tree.insert(node);
//     tree.delete(node);

//     expect(tree.objectMap.has(node.id)).toBe(false);
//     expect(tree.groupMap.get("group")?.groupNode.children.length).toBe(0);
//   });

//   test("should normalize selected objects correctly", () => {
//     const node1 = new Node(new Rectangle(10, 10, 20, 20), "group");
//     const node2 = new Node(new Rectangle(30, 30, 20, 20), "group");
//     tree.insert(node1);
//     tree.insert(node2);
//     tree.selectedObject.push(node1, node2);

//     tree.normalize();

//     expect(node1.body.Essentials.x).toBeGreaterThanOrEqual(0);
//     expect(node1.body.Essentials.y).toBeGreaterThanOrEqual(0);
//     expect(node2.body.Essentials.x).toBeGreaterThanOrEqual(0);
//     expect(node2.body.Essentials.y).toBeGreaterThanOrEqual(0);
//   });

//   test("should copy and paste selected objects correctly", () => {
//     const node = new Node(new Rectangle(10, 10, 20, 20), "group");
//     tree.insert(node);
//     tree.selectedObject.push(node);

//     tree.copySelectedObjects(10, 10);
//     tree.pasteCopiedObjects();

//     expect(tree.objects.length).toBeGreaterThan(1);
//     expect(tree.objects[1].node.body.Essentials.x).toBe(20);
//     expect(tree.objects[1].node.body.Essentials.y).toBe(20);
//   });

//   test("should select range correctly", () => {
//     const node1 = new Node(new Rectangle(10, 10, 20, 20), "group");
//     const node2 = new Node(new Rectangle(30, 30, 20, 20), "group");
//     tree.insert(node1);
//     tree.insert(node2);

//     tree.selectRange(new Rectangle(0, 0, 50, 50));

//     expect(tree.selectedObject.length).toBe(2);
//   });

//   test("should handle complex sequence of insertions, deletions, and updates", () => {
//     const node1 = new Node(new Rectangle(10, 10, 20, 20), "group1");
//     const node2 = new Node(new Rectangle(30, 30, 20, 20), "group1");
//     const node3 = new Node(new Rectangle(50, 50, 20, 20), "group2");
//     const node4 = new Node(new Rectangle(70, 70, 20, 20), "group2");
//     const node5 = new Node(new Rectangle(90, 90, 20, 20), "group3");

//     tree.insert(node1);
//     tree.insert(node2);
//     tree.insert(node3);
//     tree.insert(node4);
//     tree.insert(node5);

//     expect(tree.objectMap.size).toBe(5);

//     tree.delete(node1);
//     tree.delete(node3);

//     expect(tree.objectMap.size).toBe(3);

//     node2.body.Essentials.x = 35;
//     node2.body.Essentials.y = 35;
//     tree.insert(node2); // Re-insert to update

//     expect(tree.groupMap.get("group1")?.groupNode.body.Essentials.x).toBe(35);
//     expect(tree.groupMap.get("group1")?.groupNode.body.Essentials.y).toBe(35);

//     tree.copySelectedObjects(10, 10);
//     tree.pasteCopiedObjects();

//     expect(tree.objects.length).toBeGreaterThan(3);

//     tree.selectRange(new Rectangle(0, 0, 100, 100));
//     expect(tree.selectedObject.length).toBeGreaterThan(3);
//   });

//   test("should handle nested groups correctly", () => {
//     const parentGroup = new Node(new Rectangle(0, 0, 100, 100), "parentGroup");
//     const childGroup1 = new Node(new Rectangle(10, 10, 30, 30), "childGroup1");
//     const childGroup2 = new Node(new Rectangle(50, 50, 30, 30), "childGroup2");

//     tree.insert(parentGroup);
//     tree.insert(childGroup1);
//     tree.insert(childGroup2);

//     expect(tree.groupMap.get("parentGroup")?.groupNode.children.length).toBe(2);

//     const node1 = new Node(new Rectangle(15, 15, 10, 10), "childGroup1");
//     const node2 = new Node(new Rectangle(55, 55, 10, 10), "childGroup2");

//     tree.insert(node1);
//     tree.insert(node2);

//     expect(tree.groupMap.get("childGroup1")?.groupNode.children.length).toBe(1);
//     expect(tree.groupMap.get("childGroup2")?.groupNode.children.length).toBe(1);

//     tree.delete(node1);
//     tree.delete(node2);

//     expect(tree.groupMap.get("childGroup1")?.groupNode.children.length).toBe(0);
//     expect(tree.groupMap.get("childGroup2")?.groupNode.children.length).toBe(0);
//   });
// });
