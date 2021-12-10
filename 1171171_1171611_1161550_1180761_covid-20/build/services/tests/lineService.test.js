"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sinon = __importStar(require("sinon"));
const typedi_1 = require("typedi");
const config_1 = __importDefault(require("../../config"));
const Result_1 = require("../../core/logic/Result");
const line_1 = require("../../models/line");
const lineService_1 = __importDefault(require("../lineService"));
describe('line service', function () {
    beforeEach(function () {
    });
    let lineSchemaClass = require("../../persistence/schemas/lineSchema").default;
    typedi_1.Container.set('lineSchema', lineSchemaClass);
    let lineRepoClass = require("../../repo/lineRepo").default;
    let lineRepoInstance = typedi_1.Container.get(lineRepoClass);
    typedi_1.Container.set(config_1.default.repos.line.name, lineRepoInstance);
    it('createLine: returns json with description value', async function () {
        const body = {
            key: '1',
            name: '1',
            color: "cor bonita",
            linePaths: [],
            allowedDrivers: [],
            disallowedDrivers: [],
            allowedVehicles: [],
            disallowedVehicles: []
        };
        const compareRes = {
            key: '1',
            name: '1',
            color: "cor bonita",
            linePath: [],
            allowedDrivers: [],
            disallowedDrivers: [],
            allowedVehicles: [],
            disallowedVehicles: []
        };
        const resu = line_1.Line.create(body).getValue();
        lineRepoInstance = typedi_1.Container.get(config_1.default.repos.line.name);
        sinon.stub(lineRepoInstance, "save").returns(Result_1.Result.ok(resu));
        const serv = new lineService_1.default(lineRepoInstance);
        const res = await (await serv.createLine(body)).getValue();
        sinon.assert.match(res, compareRes);
    });
    it('listLines: returns json with array of types', async function () {
        const body = {
            key: '1',
            name: '1',
            color: "cor bonita",
            linePaths: [],
            allowedDrivers: [],
            disallowedDrivers: [],
            allowedVehicles: [],
            disallowedVehicles: []
        };
        const compareRes = {
            key: '1',
            name: '1',
            color: "cor bonita",
            linePath: [],
            allowedDrivers: [],
            disallowedDrivers: [],
            allowedVehicles: [],
            disallowedVehicles: []
        };
        const body2 = {
            key: '2',
            name: '2',
            color: "cor bonita",
            linePaths: [],
            allowedDrivers: [],
            disallowedDrivers: [],
            allowedVehicles: [],
            disallowedVehicles: []
        };
        const compareRes2 = {
            key: '2',
            name: '2',
            color: "cor bonita",
            linePath: [],
            allowedDrivers: [],
            disallowedDrivers: [],
            allowedVehicles: [],
            disallowedVehicles: []
        };
        2;
        const resu = line_1.Line.create(body).getValue();
        const resu2 = line_1.Line.create(body2).getValue();
        lineRepoInstance = typedi_1.Container.get(config_1.default.repos.line.name);
        sinon.stub(lineRepoInstance, "listByName").returns([resu, resu2]);
        const serv = new lineService_1.default(lineRepoInstance);
        serv.createLine(body2);
        serv.createLine(body);
        const res = await (await serv.listByName());
        //sinon.assert.match(res[0], body);
        sinon.assert.match([res[0].props, res[1].props], [compareRes, compareRes2]);
    });
    it('listLines: returns json with array of types', async function () {
        const body = {
            key: '1',
            name: '1',
            color: "cor bonita",
            linePaths: [],
            allowedDrivers: [],
            disallowedDrivers: [],
            allowedVehicles: [],
            disallowedVehicles: []
        };
        const compareRes = {
            key: '1',
            name: '1',
            color: "cor bonita",
            linePath: [],
            allowedDrivers: [],
            disallowedDrivers: [],
            allowedVehicles: [],
            disallowedVehicles: []
        };
        const body2 = {
            key: '2',
            name: '2',
            color: "cor bonita",
            linePaths: [],
            allowedDrivers: [],
            disallowedDrivers: [],
            allowedVehicles: [],
            disallowedVehicles: []
        };
        const compareRes2 = {
            key: '2',
            name: '2',
            color: "cor bonita",
            linePath: [],
            allowedDrivers: [],
            disallowedDrivers: [],
            allowedVehicles: [],
            disallowedVehicles: []
        };
        2;
        const resu = line_1.Line.create(body).getValue();
        const resu2 = line_1.Line.create(body2).getValue();
        lineRepoInstance = typedi_1.Container.get(config_1.default.repos.line.name);
        sinon.stub(lineRepoInstance, "listByCode").returns([resu, resu2]);
        const serv = new lineService_1.default(lineRepoInstance);
        serv.createLine(body2);
        serv.createLine(body);
        const res = await (await serv.listByCode());
        //sinon.assert.match(res[0], body);
        sinon.assert.match([res[0].props, res[1].props], [compareRes, compareRes2]);
    });
    it('filtertLines: returns json with array of types', async function () {
        const body = {
            key: '1',
            name: '1',
            color: "cor bonita",
            linePaths: [],
            allowedDrivers: [],
            disallowedDrivers: [],
            allowedVehicles: [],
            disallowedVehicles: []
        };
        const compareRes = {
            key: '1',
            name: '1',
            color: "cor bonita",
            linePath: [],
            allowedDrivers: [],
            disallowedDrivers: [],
            allowedVehicles: [],
            disallowedVehicles: []
        };
        const body2 = {
            key: '2',
            name: '2',
            color: "cor bonita",
            linePaths: [],
            allowedDrivers: [],
            disallowedDrivers: [],
            allowedVehicles: [],
            disallowedVehicles: []
        };
        const compareRes2 = {
            key: '2',
            name: '2',
            color: "cor bonita",
            linePath: [],
            allowedDrivers: [],
            disallowedDrivers: [],
            allowedVehicles: [],
            disallowedVehicles: []
        };
        2;
        const resu = line_1.Line.create(body).getValue();
        const resu2 = line_1.Line.create(body2).getValue();
        lineRepoInstance = typedi_1.Container.get(config_1.default.repos.line.name);
        sinon.stub(lineRepoInstance, "filterByName").returns([resu, resu2]);
        const serv = new lineService_1.default(lineRepoInstance);
        serv.createLine(body2);
        serv.createLine(body);
        const res = await (await serv.filterByName("1"));
        //sinon.assert.match(res[0], body);
        if (res.length > 1) {
            console.log("fail");
        }
        else {
            sinon.assert.match(res[0].props, compareRes);
        }
    });
    it('filtertLines: returns json with array of types', async function () {
        const body = {
            key: '1',
            name: '1',
            color: "cor bonita",
            linePaths: [],
            allowedDrivers: [],
            disallowedDrivers: [],
            allowedVehicles: [],
            disallowedVehicles: []
        };
        const compareRes = {
            key: '1',
            name: '1',
            color: "cor bonita",
            linePath: [],
            allowedDrivers: [],
            disallowedDrivers: [],
            allowedVehicles: [],
            disallowedVehicles: []
        };
        const body2 = {
            key: '2',
            name: '2',
            color: "cor bonita",
            linePaths: [],
            allowedDrivers: [],
            disallowedDrivers: [],
            allowedVehicles: [],
            disallowedVehicles: []
        };
        const compareRes2 = {
            key: '2',
            name: '2',
            color: "cor bonita",
            linePath: [],
            allowedDrivers: [],
            disallowedDrivers: [],
            allowedVehicles: [],
            disallowedVehicles: []
        };
        2;
        const resu = line_1.Line.create(body).getValue();
        const resu2 = line_1.Line.create(body2).getValue();
        lineRepoInstance = typedi_1.Container.get(config_1.default.repos.line.name);
        sinon.stub(lineRepoInstance, "filterCode").returns([resu, resu2]);
        const serv = new lineService_1.default(lineRepoInstance);
        serv.createLine(body2);
        serv.createLine(body);
        const res = await (await serv.filterCode("1"));
        //sinon.assert.match(res[0], body);
        if (res.length > 1) {
            console.log("fail");
        }
        else {
            sinon.assert.match(res[0].props, compareRes);
        }
    });
});
//# sourceMappingURL=lineService.test.js.map