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
const pathController_1 = __importDefault(require("./pathController"));
describe('path controller', function () {
    beforeEach(function () {
    });
    it('createPath: returns json with key+isEmpty+pathNodes values', async function () {
        let body = { "idLinha": "Line:1",
            "linePathID": "LinePath:101",
            "orientation": "Go",
            "key": "Path:101",
            "isEmpty": false,
            "pathNodes": { "pathNode": [{ "key": "PathNode:102", "node": "Node:1" }, { "key": "PathNode:103", "node": "Node:2", "duration": 4, "distance": 5 }] } };
        let req = {};
        req.body = body;
        let res = {
            json: sinon.spy()
        };
        let next = () => { };
        let pathServiceClass = require(config_1.default.services.path.path).default;
        let pathServiceInstance = typedi_1.Container.get(pathServiceClass);
        typedi_1.Container.set(config_1.default.services.path.name, pathServiceInstance);
        pathServiceInstance = typedi_1.Container.get(config_1.default.services.path.name);
        const mock = sinon.stub(pathServiceInstance, "createPath").returns(Result_1.Result.ok({ "idLinha": req.body.idLinha, "linePathID": req.body.linePathID, "orientation": req.body.orientation, "key": req.body.key,
            "isEmpty": req.body.isEmpty, "pathNodes": req.body.pathNodes }));
        const ctrl = new pathController_1.default(pathServiceInstance);
        await ctrl.createPath(req, res, next);
        sinon.assert.calledOnce(mock);
        sinon.assert.calledWith(mock, sinon.match({ "idLinha": req.body.idLinha, "linePathID": req.body.linePathID, "orientation": req.body.orientation, "key": req.body.key,
            "isEmpty": req.body.isEmpty, "pathNodes": req.body.pathNodes }));
        mock.restore();
    });
    it('listPathsOfLine: returns json with array of linhas', async function () {
        let body = {
            "idLinha": "Line:1",
            "linePathID": "LinePath:101",
            "orientation": "Go",
            "keyP": "Path:101",
            "isEmpty": false,
            "pathNodes": { "pathNode": [{ "key": "PathNode:102", "node": "Node:1" }, { "key": "PathNode:103", "node": "Node:2", "duration": 4, "distance": 5 }] }
        };
        let body3 = {
            "key": "Line:1"
        };
        let req = {};
        let req3 = {};
        req.body = body;
        req3.params = body3;
        let res = {};
        let res3 = {
            json: sinon.spy()
        };
        let next = () => { };
        let pathServiceClass = require(config_1.default.services.path.path).default;
        let pathServiceInstance = typedi_1.Container.get(pathServiceClass);
        typedi_1.Container.set(config_1.default.services.path.name, pathServiceInstance);
        pathServiceInstance = typedi_1.Container.get(config_1.default.services.path.name);
        const mock = sinon.stub(pathServiceInstance, "listPathsByLine").returns(Result_1.Result.ok([{
                "idLinha": req.body.idLinha,
                "linePathID": req.body.linePathID,
                "orientation": req.body.orientation,
                "key": req.body.keyP,
                "isEmpty": req.body.isEmpty,
                "pathNodes": req.body.pathNodes
            }]));
        const ctrl = new pathController_1.default(pathServiceInstance);
        await ctrl.createPath(req, res, next);
        await ctrl.listPathsByLine(req3, res3, next);
        sinon.assert.calledOnce(mock);
        sinon.assert.calledWith(mock, sinon.match("Line:1"));
        mock.restore();
    });
});
//# sourceMappingURL=pathController.test.js.map