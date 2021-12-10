"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pathNode_1 = require("../pathNode");
describe('Create a valid pathNode', () => {
    var key = "PathNode:1";
    var node = "Node:1";
    var duration = 1;
    var distance = 1;
    var pathNode = pathNode_1.PathNode.create({ key: "PathNode:1", node: "Node:1", duration: 1, distance: 1 }).getValue();
    it("ensure all Parameters are well formed", () => {
        expect(pathNode.key).toEqual(key);
    });
    it("ensure all Parameters are well formed", () => {
        expect(pathNode.node).toEqual(node);
    });
    it("ensure all Parameters are well formed", () => {
        expect(pathNode.duration).toEqual(duration);
    });
    it("ensure all Parameters are well formed", () => {
        expect(pathNode.distance).toEqual(distance);
    });
});
//# sourceMappingURL=pathNode.test.js.map