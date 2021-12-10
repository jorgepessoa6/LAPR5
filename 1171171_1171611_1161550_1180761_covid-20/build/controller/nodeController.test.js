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
const config_1 = __importDefault(require("../config"));
const Result_1 = require("../core/logic/Result");
const nodeController_1 = __importDefault(require("./nodeController"));
describe('node controller', function () {
    beforeEach(function () {
    });
    it('createNode: returns json with key+name+description values', async function () {
        let body = {
            "key": "ddw123",
            "name": "qw",
            "latitude": 2,
            "longitude": 3,
            "shortName": "short",
            "isDepot": false,
            "isReliefPoint": false,
            "capacities": null,
            "informationPoint": null,
            "crewTravelTimes": null
        };
        let req = {};
        req.body = body;
        let res = {
            json: sinon.spy()
        };
        let next = () => { };
        let nodeServiceClass = require(config_1.default.services.node.path).default;
        let nodeServiceInstance = typedi_1.Container.get(nodeServiceClass);
        typedi_1.Container.set(config_1.default.services.node.name, nodeServiceInstance);
        nodeServiceInstance = typedi_1.Container.get(config_1.default.services.node.name);
        const mock = sinon.stub(nodeServiceInstance, "createNode").returns(Result_1.Result.ok({
            "key": req.body.key,
            "name": req.body.name, "latitude": req.body.longitude, "longitude": req.body.longitude, "shortName": req.body.shortName,
            "isDepot": req.body.isDepot, "isReliefPoint": req.body.isReliefPoint, "capacities": null,
            "informationPoint": null, "crewTravelTimes": null
        }));
        const ctrl = new nodeController_1.default(nodeServiceInstance);
        await ctrl.createNode(req, res, next);
        sinon.assert.calledOnce(mock);
        sinon.assert.calledWith(mock, sinon.match({
            "key": req.body.key,
            "name": req.body.name, "latitude": req.body.latitude, "longitude": req.body.longitude, "shortName": req.body.shortName,
            "isDepot": req.body.isDepot, "isReliefPoint": req.body.isReliefPoint, "capacities": null,
            "informationPoint": null, "crewTravelTimes": null
        }));
        mock.restore();
    });
    it('listByName: returns json with array of nodes by name', async function () {
        let body = {
            "key": "btestList",
            "name": "btestList",
            "latitude": 2,
            "longitude": 3,
            "shortName": "short",
            "isDepot": false,
            "isReliefPoint": false,
            "capacities": null,
            "informationPoint": null,
            "crewTravelTimes": null
        };
        let body2 = {
            "key": "atestList2",
            "name": "atestList2",
            "latitude": 2,
            "longitude": 3,
            "shortName": "short",
            "isDepot": false,
            "isReliefPoint": false,
            "capacities": null,
            "informationPoint": null,
            "crewTravelTimes": null
        };
        let req = {};
        let req2 = {};
        req.body = body;
        req2.body = body2;
        let res = {};
        let res2 = {};
        let res3 = {
            json: sinon.spy()
        };
        let next = () => { };
        let nodeServiceClass = require(config_1.default.services.node.path).default;
        let nodeServiceInstance = typedi_1.Container.get(nodeServiceClass);
        typedi_1.Container.set(config_1.default.services.node.name, nodeServiceInstance);
        nodeServiceInstance = typedi_1.Container.get(config_1.default.services.node.name);
        const mock = sinon.stub(nodeServiceInstance, "listByName").returns(Result_1.Result.ok([{
                "key": req.body.key,
                "name": req.body.name,
                "latitude": req.body.latitude,
                "longitude": req.body.longitude,
                "shortName": req.body.shortName,
                "isDepot": req.body.isDepot,
                "isReliefPoint": req.body.isReliefPoint,
                "informationPoint": req.body.informationPoint,
                "capacities": req.body.capacities,
                "crewTravelTimes": req.body.crewTravelTimes
            },
            {
                "key": req2.body.key,
                "name": req2.body.name,
                "latitude": req2.body.latitude,
                "longitude": req2.body.longitude,
                "shortName": req2.body.shortName,
                "isDepot": req2.body.isDepot,
                "isReliefPoint": req2.body.isReliefPoint,
                "informationPoint": req2.body.informationPoint,
                "capacities": req2.body.capacities,
                "crewTravelTimes": req2.body.crewTravelTimes
            }]));
        const ctrl = new nodeController_1.default(nodeServiceInstance);
        await ctrl.createNode(req, res, next);
        await ctrl.createNode(req2, res2, next);
        await ctrl.listByName(res3, next);
        sinon.assert.calledOnce(mock);
        /* sinon.assert.calledOn(mock, sinon.match([{
           "key": "atestList2",
           "name": "atestList2",
           "latitude": 2,
           "longitude": 3,
           "shortName": "short",
           "isDepot": false,
           "isReliefPoint": false,
           "capacities": null,
           "informationPoint": null,
           "crewTravelTimes": null
       }, {
           "key": "btestList",
           "name": "btestList",
           "latitude": 2,
           "longitude": 3,
           "shortName": "short",
           "isDepot": false,
           "isReliefPoint": false,
           "capacities": null,
           "informationPoint": null,
           "crewTravelTimes": null
       }]));  */
        mock.restore();
    });
    it('filterByName: returns json with array of nodes by name', async function () {
        let body = {
            "key": "btestList",
            "name": "btestList",
            "latitude": 2,
            "longitude": 3,
            "shortName": "short",
            "isDepot": false,
            "isReliefPoint": false,
            "capacities": null,
            "informationPoint": null,
            "crewTravelTimes": null
        };
        let body2 = {
            "key": "atestList2",
            "name": "atestList2",
            "latitude": 2,
            "longitude": 3,
            "shortName": "short",
            "isDepot": false,
            "isReliefPoint": false,
            "capacities": null,
            "informationPoint": null,
            "crewTravelTimes": null
        };
        let req = {};
        let req2 = {};
        let req3 = {};
        req.body = body;
        req2.body = body2;
        let param = {
            "name": "b"
        };
        req3.params = param;
        let res = {};
        let res2 = {};
        let res3 = {
            json: sinon.spy()
        };
        let next = () => { };
        let nodeServiceClass = require(config_1.default.services.node.path).default;
        let nodeServiceInstance = typedi_1.Container.get(nodeServiceClass);
        typedi_1.Container.set(config_1.default.services.node.name, nodeServiceInstance);
        nodeServiceInstance = typedi_1.Container.get(config_1.default.services.node.name);
        const mock = sinon.stub(nodeServiceInstance, "filterByName").returns(Result_1.Result.ok([{
                "key": req.body.key,
                "name": req.body.name,
                "latitude": req.body.latitude,
                "longitude": req.body.longitude,
                "shortName": req.body.shortName,
                "isDepot": req.body.isDepot,
                "isReliefPoint": req.body.isReliefPoint,
                "informationPoint": req.body.informationPoint,
                "capacities": req.body.capacities,
                "crewTravelTimes": req.body.crewTravelTimes
            }]));
        const ctrl = new nodeController_1.default(nodeServiceInstance);
        await ctrl.createNode(req, res, next);
        await ctrl.createNode(req2, res2, next);
        await ctrl.filterByName(req3, res3, next);
        sinon.assert.calledOnce(mock);
        sinon.assert.calledWith(mock, sinon.match("b"));
        mock.restore();
    });
    it('listByCode: returns json with array of nodes by name', async function () {
        let body = {
            "key": "btestList",
            "name": "btestList",
            "latitude": 2,
            "longitude": 3,
            "shortName": "short",
            "isDepot": false,
            "isReliefPoint": false,
            "capacities": null,
            "informationPoint": null,
            "crewTravelTimes": null
        };
        let body2 = {
            "key": "atestList2",
            "name": "atestList2",
            "latitude": 2,
            "longitude": 3,
            "shortName": "short",
            "isDepot": false,
            "isReliefPoint": false,
            "capacities": null,
            "informationPoint": null,
            "crewTravelTimes": null
        };
        let req = {};
        let req2 = {};
        req.body = body;
        req2.body = body2;
        let res = {};
        let res2 = {};
        let res3 = {
            json: sinon.spy()
        };
        let next = () => { };
        let nodeServiceClass = require(config_1.default.services.node.path).default;
        let nodeServiceInstance = typedi_1.Container.get(nodeServiceClass);
        typedi_1.Container.set(config_1.default.services.node.name, nodeServiceInstance);
        nodeServiceInstance = typedi_1.Container.get(config_1.default.services.node.name);
        const mock = sinon.stub(nodeServiceInstance, "listByCode").returns(Result_1.Result.ok([{
                "key": req.body.key,
                "name": req.body.name,
                "latitude": req.body.latitude,
                "longitude": req.body.longitude,
                "shortName": req.body.shortName,
                "isDepot": req.body.isDepot,
                "isReliefPoint": req.body.isReliefPoint,
                "informationPoint": req.body.informationPoint,
                "capacities": req.body.capacities,
                "crewTravelTimes": req.body.crewTravelTimes
            },
            {
                "key": req2.body.key,
                "name": req2.body.name,
                "latitude": req2.body.latitude,
                "longitude": req2.body.longitude,
                "shortName": req2.body.shortName,
                "isDepot": req2.body.isDepot,
                "isReliefPoint": req2.body.isReliefPoint,
                "informationPoint": req2.body.informationPoint,
                "capacities": req2.body.capacities,
                "crewTravelTimes": req2.body.crewTravelTimes
            }]));
        const ctrl = new nodeController_1.default(nodeServiceInstance);
        await ctrl.createNode(req, res, next);
        await ctrl.createNode(req2, res2, next);
        await ctrl.listByCode(res3, next);
        sinon.assert.calledOnce(mock);
        mock.restore();
    });
    /*
     it('filterByCode: returns json with array of nodes by code', async function () {
         let body = {
             "key": "btestList",
             "name": "btestList",
             "latitude": 2,
             "longitude": 3,
             "shortName": "short",
             "isDepot": false,
             "isReliefPoint": false,
             "capacities": null,
             "informationPoint": null,
             "crewTravelTimes": null
         };
 
         let body2 = {
             "key": "atestList2",
             "name": "atestList2",
             "latitude": 2,
             "longitude": 3,
             "shortName": "short",
             "isDepot": false,
             "isReliefPoint": false,
             "capacities": null,
             "informationPoint": null,
             "crewTravelTimes": null
         };
 
         let req: Partial<Request> = {};
         let req2: Partial<Request> = {};
         let req3: Partial<Request> = {};
         req.body = body;
         req2.body = body2;
         let param = {
             "key": "b"
         };
         req3.params = param;
 
         let res: Partial<Response> = {};
         let res2: Partial<Response> = {};
         let res3: Partial<Response> = {
             json: sinon.spy()
         };
         let next: Partial<NextFunction> = () => { };
 
 
         let nodeServiceClass = require(config.services.node.path).default;
         let nodeServiceInstance = Container.get(nodeServiceClass)
         Container.set(config.services.node.name, nodeServiceInstance);
 
         nodeServiceInstance = Container.get(config.services.node.name);
         const mock = sinon.stub(nodeServiceInstance, "filterByCode").returns(Result.ok<INodeDTO[]>([{
             "key": req.body.key,
             "name": req.body.name,
             "latitude": req.body.latitude,
             "longitude": req.body.longitude,
             "shortName": req.body.shortName,
             "isDepot": req.body.isDepot,
             "isReliefPoint": req.body.isReliefPoint,
             "informationPoint": req.body.informationPoint,
             "capacities": req.body.capacities,
             "crewTravelTimes": req.body.crewTravelTimes
         }]));
         const ctrl = new NodeController(nodeServiceInstance as INodeService);
         await ctrl.createNode(<Request>req, <Response>res, <NextFunction>next);
         await ctrl.createNode(<Request>req2, <Response>res2, <NextFunction>next);
         await ctrl.filterByCode(<Request>req3, <Response>res3, <NextFunction>next);
         sinon.assert.calledOnce(mock);
         sinon.assert.calledWith(mock, sinon.match("b"));
         mock.restore();
     });  */
});
//# sourceMappingURL=nodeController.test.js.map