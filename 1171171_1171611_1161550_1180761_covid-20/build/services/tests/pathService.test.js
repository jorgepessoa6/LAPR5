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
const path_1 = require("../../models/path");
const pathService_1 = __importDefault(require("../pathService"));
const Result_1 = require("../../core/logic/Result");
describe('pathController', function () {
    beforeEach(function () {
    });
    let pathSchemaClass = require("../../persistence/schemas/pathSchema").default;
    typedi_1.Container.set('pathSchema', pathSchemaClass);
    let lineSchemaClass = require("../../persistence/schemas/lineSchema").default;
    typedi_1.Container.set('lineSchema', lineSchemaClass);
    let pathRepoClass = require("../../repo/pathRepo").default;
    let pathRepoInstance = typedi_1.Container.get(pathRepoClass);
    typedi_1.Container.set(config_1.default.repos.path.name, pathRepoInstance);
    let lineRepoClass = require("../../repo/lineRepo").default;
    let lineRepoInstance = typedi_1.Container.get(lineRepoClass);
    typedi_1.Container.set(config_1.default.repos.line.name, lineRepoInstance);
    it('createPath: returns json with description value', async function () {
        const body = {
            "idLinha": "Line:1",
            "linePathID": "LinePath:101",
            "orientation": "Go",
            "key": "Path:101",
            "isEmpty": false,
            "pathNodes": [{ "key": "PathNode:102", "node": "Node:1" }, { "key": "PathNode:103", "node": "Node:2", "duration": 4, "distance": 5 }]
        };
        const body2 = {
            "key": "Path:101",
            "isEmpty": false,
            "pathNodes": [{ "key": "PathNode:102", "node": "Node:1" }, { "key": "PathNode:103", "node": "Node:2", "duration": 4, "distance": 5 }]
        };
        const resu = path_1.Path.create(body).getValue();
        pathRepoInstance = typedi_1.Container.get(config_1.default.repos.path.name);
        lineRepoInstance = typedi_1.Container.get(config_1.default.repos.line.name);
        sinon.stub(pathRepoInstance, "save").returns(Result_1.Result.ok(resu));
        const serv = new pathService_1.default(pathRepoInstance, lineRepoInstance);
        const res = await (await serv.createPathImport(body)).getValue();
        sinon.assert.match(res, body2);
    });
    /*
        it('listNodes by code : returns json with sorted array of types', async function () {
    
            const body = {
                "idLinha": "Line:1",
                "linePathID": "LinePath:101",
                "orientation": "Go",
                "key": "Path:101",
                "isEmpty": false,
                "pathNodes":[{"key": "PathNode:102","node": "Node:1"}, {"key": "PathNode:103","node": "Node:2","duration":4,"distance":5}]
            } as IPathDTO;
    
            const resu = Path.create(body).getValue();
    
            pathRepoInstance = Container.get(config.repos.path.name);
            sinon.stub(pathRepoInstance, "listPathsByLine").returns([resu]);
    
            const serv = new PathService(pathRepoInstance as IPathRepo, lineRepoInstance as ILineRepo);
            
            serv.createPath(body);
            const res = await (await serv.listPathsByLine("Line:1"));
            sinon.assert.match([res[0].props], [body]);
        });
        */
});
//# sourceMappingURL=pathService.test.js.map