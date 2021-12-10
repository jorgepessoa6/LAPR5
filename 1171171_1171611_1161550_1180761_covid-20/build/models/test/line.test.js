"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const line_1 = require("../line");
describe('Create a valid node', () => {
    var keyTest = '1';
    var name1 = '1';
    var color1 = "cor bonita";
    var linePath1 = [];
    var allowedVehicles1 = [];
    var disallowedVehicles1 = [];
    var allowedDrivers1 = [];
    var disallowedDrivers1 = [];
    /*   var linePath = new Array<LinePath>(LinePath.create({
              key: "1",
              path: "path",
              orientation: null
          }).getValue());
   */
    var linha = line_1.Line.create({
        key: '1',
        name: '1',
        color: "cor bonita",
        linePaths: null,
        allowedDrivers: null,
        disallowedDrivers: null,
        allowedVehicles: null,
        disallowedVehicles: null,
    }).getValue();
    it("ensure all Parameters are well formed", () => {
        expect(linha.key).toEqual(keyTest);
    });
    it("ensure all Parameters are well formed", () => {
        expect(linha.name).toEqual(name1);
    });
    it("ensure all Parameters are well formed", () => {
        expect(linha.color).toEqual(color1);
    });
    it("ensure all Parameters are well formed", () => {
        expect(linha.linePath).toEqual(linePath1);
    });
    it("ensure all Parameters are well formed", () => {
        expect(linha.allowedDrivers).toEqual(allowedDrivers1);
    });
    it("ensure all Parameters are well formed", () => {
        expect(linha.disallowedDrivers).toEqual(disallowedDrivers1);
    });
    it("ensure all Parameters are well formed", () => {
        expect(linha.allowedVehicles).toEqual(allowedVehicles1);
    });
    it("ensure all Parameters are well formed", () => {
        expect(linha.disallowedVehicles).toEqual(disallowedVehicles1);
    });
});
//# sourceMappingURL=line.test.js.map