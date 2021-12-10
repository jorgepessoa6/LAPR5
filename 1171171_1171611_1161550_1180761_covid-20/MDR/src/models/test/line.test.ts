import { first } from 'lodash';
import { Line } from '../line';


describe('Create a valid node', () => {
    var keyTest = '1';
    var name1 = '1';
    var firstNode1 = "1";
    var lastNode1 = "2";
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

    var linha = Line.create({
        key: '1',
        name: '1',
        firstNode: "1",
        lastNode: "2",
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
        expect(linha.firstNode).toEqual(firstNode1);
    });
    it("ensure all Parameters are well formed", () => {
        expect(linha.lastNode).toEqual(lastNode1);
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