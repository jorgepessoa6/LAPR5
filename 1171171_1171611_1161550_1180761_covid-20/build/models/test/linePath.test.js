"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const linePath_1 = require("../linePath");
describe('Create a valid linePath', () => {
    var linePathID = "LinePath";
    var key = "Path";
    var orientation = null;
    var linePath = linePath_1.LinePath.create({ idLinha: "Linha:1", linePathID: "LinePath", orientation: null, key: 'Path', isEmpty: false, pathNodes: [] }).getValue();
    it("ensure all Parameters are well formed", () => {
        expect(linePath.key).toEqual(linePathID);
    });
    it("ensure all Parameters are well formed", () => {
        expect(linePath.path).toEqual(key);
    });
    it("ensure all Parameters are well formed", () => {
        expect(linePath.orientation).toEqual(orientation);
    });
});
//# sourceMappingURL=linePath.test.js.map