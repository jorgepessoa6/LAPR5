"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = require("../path");
describe('Create a valid path', () => {
    var keyTest = '1';
    var isEmpty = false;
    var pathNodes = [];
    var path = path_1.Path.create({ idLinha: "Linha:1", linePathID: "LinhaPath:1", orientation: null, key: '1', isEmpty: false, pathNodes: [] }).getValue();
    it("ensure all Parameters are well formed", () => {
        expect(path.key).toEqual(keyTest);
    });
    it("ensure all Parameters are well formed", () => {
        expect(path.isEmpty).toEqual(isEmpty);
    });
    it("ensure all Parameters are well formed", () => {
        expect(path.pathNodes).toEqual(pathNodes);
    });
});
//# sourceMappingURL=path.test.js.map