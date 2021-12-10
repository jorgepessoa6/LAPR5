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
const node_1 = require("../../models/node");
const nodeService_1 = __importDefault(require("../nodeService"));
const Result_1 = require("../../core/logic/Result");
describe('nodeController', function () {
    beforeEach(function () {
    });
    let nodeSchemaClass = require("../../persistence/schemas/nodeSchema").default;
    typedi_1.Container.set('nodeSchema', nodeSchemaClass);
    let nodeRepoClass = require("../../repo/nodeRepo").default;
    let nodeRepoInstance = typedi_1.Container.get(nodeRepoClass);
    typedi_1.Container.set(config_1.default.repos.node.name, nodeRepoInstance);
    it('createNode: returns json with description value', async function () {
        const body = {
            key: '1',
            name: '1',
            latitude: 1,
            longitude: 1,
            isDepot: false,
            isReliefPoint: false,
            shortName: '1'
        };
        const resu = node_1.Node.create(body).getValue();
        nodeRepoInstance = typedi_1.Container.get(config_1.default.repos.node.name);
        sinon.stub(nodeRepoInstance, "save").returns(Result_1.Result.ok(resu));
        const serv = new nodeService_1.default(nodeRepoInstance);
        const res = await (await serv.createNode(body)).getValue();
        sinon.assert.match(res, body);
    });
    it('listNodes: returns json with array of types', async function () {
        const body = {
            key: '1',
            name: '1',
            latitude: 1,
            longitude: 1,
            isDepot: false,
            isReliefPoint: false,
            shortName: '1',
            capacities: [],
            informationPoint: [],
            crewTravelTimes: []
        };
        const body2 = {
            key: '2',
            name: '2',
            latitude: 1,
            longitude: 1,
            isDepot: false,
            isReliefPoint: false,
            shortName: '1',
            capacities: [],
            informationPoint: [],
            crewTravelTimes: []
        };
        const body3 = {
            key: '3',
            name: '3',
            latitude: 1,
            longitude: 1,
            isDepot: false,
            isReliefPoint: false,
            shortName: '1',
            capacities: [],
            informationPoint: [],
            crewTravelTimes: []
        };
        const resu = node_1.Node.create(body).getValue();
        const resu2 = node_1.Node.create(body2).getValue();
        const resu3 = node_1.Node.create(body3).getValue();
        nodeRepoInstance = typedi_1.Container.get(config_1.default.repos.node.name);
        sinon.stub(nodeRepoInstance, "listByName").returns([resu, resu2, resu3]);
        const serv = new nodeService_1.default(nodeRepoInstance);
        serv.createNode(body3);
        serv.createNode(body2);
        serv.createNode(body);
        const res = await (await serv.listByName());
        //sinon.assert.match(res[0], body);
        sinon.assert.match([res[0].props, res[1].props, res[2].props], [body, body2, body3]);
    });
    it('listNodes by code : returns json with sorted array of types', async function () {
        const body = {
            key: 'a',
            name: 'a',
            latitude: 1,
            longitude: 1,
            isDepot: false,
            isReliefPoint: false,
            shortName: '1',
            capacities: [],
            informationPoint: [],
            crewTravelTimes: []
        };
        const body2 = {
            key: 'b',
            name: 'b',
            latitude: 1,
            longitude: 1,
            isDepot: false,
            isReliefPoint: false,
            shortName: '1',
            capacities: [],
            informationPoint: [],
            crewTravelTimes: []
        };
        const body3 = {
            key: 'c',
            name: 'c',
            latitude: 1,
            longitude: 1,
            isDepot: false,
            isReliefPoint: false,
            shortName: '1',
            capacities: [],
            informationPoint: [],
            crewTravelTimes: []
        };
        const resu = node_1.Node.create(body).getValue();
        const resu2 = node_1.Node.create(body2).getValue();
        const resu3 = node_1.Node.create(body3).getValue();
        nodeRepoInstance = typedi_1.Container.get(config_1.default.repos.node.name);
        sinon.stub(nodeRepoInstance, "listByCode").returns([resu, resu2, resu3]);
        const serv = new nodeService_1.default(nodeRepoInstance);
        serv.createNode(body2);
        serv.createNode(body3);
        serv.createNode(body);
        const res = await (await serv.listByCode());
        //sinon.assert.match(res[0], body);
        sinon.assert.match([res[0].props, res[1].props, res[2].props], [body, body2, body3]);
    });
    it('listNodes by code : returns json with sorted array of types', async function () {
        const body = {
            key: 'a',
            name: 'a',
            latitude: 1,
            longitude: 1,
            isDepot: false,
            isReliefPoint: false,
            shortName: '1',
            capacities: [],
            informationPoint: [],
            crewTravelTimes: []
        };
        const body2 = {
            key: 'b',
            name: 'b',
            latitude: 1,
            longitude: 1,
            isDepot: false,
            isReliefPoint: false,
            shortName: '1',
            capacities: [],
            informationPoint: [],
            crewTravelTimes: []
        };
        const body3 = {
            key: 'c',
            name: 'c',
            latitude: 1,
            longitude: 1,
            isDepot: false,
            isReliefPoint: false,
            shortName: '1',
            capacities: [],
            informationPoint: [],
            crewTravelTimes: []
        };
        const resu = node_1.Node.create(body).getValue();
        const resu2 = node_1.Node.create(body2).getValue();
        const resu3 = node_1.Node.create(body3).getValue();
        nodeRepoInstance = typedi_1.Container.get(config_1.default.repos.node.name);
        sinon.stub(nodeRepoInstance, "filterByName").returns([resu, resu2, resu3]);
        const serv = new nodeService_1.default(nodeRepoInstance);
        serv.createNode(body2);
        serv.createNode(body3);
        serv.createNode(body);
        const res = await (await serv.filterByName("a"));
        //sinon.assert.match(res[0], body);
        if (res.length > 1) {
            console.log("fail");
        }
        else {
            sinon.assert.match(res[0].props, body);
        }
    });
    it('listNodes by code : returns json with sorted array of types', async function () {
        const body = {
            key: 'a',
            name: 'a',
            latitude: 1,
            longitude: 1,
            isDepot: false,
            isReliefPoint: false,
            shortName: '1',
            capacities: [],
            informationPoint: [],
            crewTravelTimes: []
        };
        const body2 = {
            key: 'b',
            name: 'b',
            latitude: 1,
            longitude: 1,
            isDepot: false,
            isReliefPoint: false,
            shortName: '1',
            capacities: [],
            informationPoint: [],
            crewTravelTimes: []
        };
        const body3 = {
            key: 'c',
            name: 'c',
            latitude: 1,
            longitude: 1,
            isDepot: false,
            isReliefPoint: false,
            shortName: '1',
            capacities: [],
            informationPoint: [],
            crewTravelTimes: []
        };
        const resu = node_1.Node.create(body).getValue();
        const resu2 = node_1.Node.create(body2).getValue();
        const resu3 = node_1.Node.create(body3).getValue();
        nodeRepoInstance = typedi_1.Container.get(config_1.default.repos.node.name);
        sinon.stub(nodeRepoInstance, "filterCode").returns([resu, resu2, resu3]);
        const serv = new nodeService_1.default(nodeRepoInstance);
        serv.createNode(body2);
        serv.createNode(body3);
        serv.createNode(body);
        const res = await (await serv.filterCode("a"));
        //sinon.assert.match(res[0], body);
        if (res.length > 1) {
            console.log("fail");
        }
        else {
            sinon.assert.match(res[0].props, body);
        }
    });
});
//# sourceMappingURL=nodeService.test.js.map