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
const config_1 = __importDefault(require("../config"));
const lineController_1 = __importDefault(require("./lineController"));
const typedi_1 = require("typedi");
const Result_1 = require("../core/logic/Result");
describe('line controller', function () {
    it('createLine: returns json with key+name+color values', async function () {
        let body = {
            "key": "test",
            "name": "test",
            "color": "RGB(1,1,1)",
            "linePaths": null,
            "allowedDrivers": null,
            "disallowedDrivers": null,
            "allowedVehicles": null,
            "disallowedVehicles": null,
        };
        let req = {};
        req.body = body;
        let res = {
            json: sinon.spy(),
        };
        let next = () => { };
        let lineServiceClass = require(config_1.default.services.line.path).default;
        let lineServiceInstance = typedi_1.Container.get(lineServiceClass);
        typedi_1.Container.set(config_1.default.services.line.name, lineServiceInstance);
        lineServiceInstance = typedi_1.Container.get(config_1.default.services.line.name);
        const mock = sinon.stub(lineServiceInstance, 'createLine').returns(Result_1.Result.ok({
            "key": req.body.key,
            "name": req.body.name,
            "color": req.body.color,
            "linePaths": null,
            "allowedDrivers": null,
            "disallowedDrivers": null,
            "allowedVehicles": null,
            "disallowedVehicles": null,
        }));
        const ctrl = new lineController_1.default(lineServiceInstance);
        await ctrl.createLine(req, res, next);
        sinon.assert.calledOnce(mock);
        sinon.assert.calledWith(mock, sinon.match({
            "key": req.body.key,
            "name": req.body.name,
            "color": req.body.color,
            "linePaths": null,
            "allowedDrivers": null,
            "disallowedDrivers": null,
            "allowedVehicles": null,
            "disallowedVehicles": null,
        }));
        mock.restore();
    });
    it('listByName: returns json with array of lines by name', async function () {
        let body = {
            "key": 'b1',
            "name": 'b1',
            "color": "cor bonita",
            "linePaths": null,
            "allowedDrivers": null,
            "disallowedDrivers": null,
            "allowedVehicles": null,
            "disallowedVehicles": null,
        };
        let body2 = {
            "key": "atestList2",
            "name": "atestList2",
            "color": "cor bonita2",
            "linePaths": null,
            "allowedDrivers": null,
            "disallowedDrivers": null,
            "allowedVehicles": null,
            "disallowedVehicles": null,
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
        let lineServiceClass = require(config_1.default.services.line.path).default;
        let lineServiceInstance = typedi_1.Container.get(lineServiceClass);
        typedi_1.Container.set(config_1.default.services.line.name, lineServiceInstance);
        lineServiceInstance = typedi_1.Container.get(config_1.default.services.line.name);
        const mock = sinon.stub(lineServiceInstance, "listByName").returns(Result_1.Result.ok([{
                "key": req.body.key,
                "name": req.body.name,
                "color": req.body.color,
                "linePaths": req.body.linePaths,
                "allowedDrivers": req.body.allowedDrivers,
                "disallowedDrivers": req.body.disallowedDrivers,
                "allowedVehicles": req.body.allowedVehicles,
                "disallowedVehicles": req.body.disallowedVehicles
            },
            {
                "key": req2.body.key,
                "name": req2.body.name,
                "color": req2.body.color,
                "linePaths": req2.body.linePaths,
                "allowedDrivers": req2.body.allowedDrivers,
                "disallowedDrivers": req2.body.disallowedDrivers,
                "allowedVehicles": req2.body.allowedVehicles,
                "disallowedVehicles": req2.body.disallowedVehicles
            }]));
        const ctrl = new lineController_1.default(lineServiceInstance);
        await ctrl.createLine(req, res, next);
        await ctrl.createLine(req2, res2, next);
        await ctrl.listByName(res3, next);
        sinon.assert.calledOnce(mock);
        mock.restore();
    });
    it('listByCode: returns json with array of lines by name', async function () {
        let body = {
            "key": 'b1',
            "name": 'b1',
            "color": "cor bonita",
            "linePaths": null,
            "allowedDrivers": null,
            "disallowedDrivers": null,
            "allowedVehicles": null,
            "disallowedVehicles": null,
        };
        let body2 = {
            "key": "atestList2",
            "name": "atestList2",
            "color": "cor bonita2",
            "linePaths": null,
            "allowedDrivers": null,
            "disallowedDrivers": null,
            "allowedVehicles": null,
            "disallowedVehicles": null,
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
        let lineServiceClass = require(config_1.default.services.line.path).default;
        let lineServiceInstance = typedi_1.Container.get(lineServiceClass);
        typedi_1.Container.set(config_1.default.services.line.name, lineServiceInstance);
        lineServiceInstance = typedi_1.Container.get(config_1.default.services.line.name);
        const mock = sinon.stub(lineServiceInstance, "listByCode").returns(Result_1.Result.ok([{
                "key": req.body.key,
                "name": req.body.name,
                "color": req.body.color,
                "linePaths": req.body.linePaths,
                "allowedDrivers": req.body.allowedDrivers,
                "disallowedDrivers": req.body.disallowedDrivers,
                "allowedVehicles": req.body.allowedVehicles,
                "disallowedVehicles": req.body.disallowedVehicles
            },
            {
                "key": req2.body.key,
                "name": req2.body.name,
                "color": req2.body.color,
                "linePaths": req2.body.linePaths,
                "allowedDrivers": req2.body.allowedDrivers,
                "disallowedDrivers": req2.body.disallowedDrivers,
                "allowedVehicles": req2.body.allowedVehicles,
                "disallowedVehicles": req2.body.disallowedVehicles
            }]));
        const ctrl = new lineController_1.default(lineServiceInstance);
        await ctrl.createLine(req, res, next);
        await ctrl.createLine(req2, res2, next);
        await ctrl.listByCode(res3, next);
        sinon.assert.calledOnce(mock);
        mock.restore();
    });
    it('filterByName: returns json with array of lines by name', async function () {
        let body = {
            "key": '1',
            "name": 'b',
            "color": "cor bonita",
            "linePaths": null,
            "allowedDrivers": null,
            "disallowedDrivers": null,
            "allowedVehicles": null,
            "disallowedVehicles": null,
        };
        let body2 = {
            "key": "atestList2",
            "name": "atestList2",
            "color": "cor bonita2",
            "linePaths": null,
            "allowedDrivers": null,
            "disallowedDrivers": null,
            "allowedVehicles": null,
            "disallowedVehicles": null,
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
        let lineServiceClass = require(config_1.default.services.line.path).default;
        let lineServiceInstance = typedi_1.Container.get(lineServiceClass);
        typedi_1.Container.set(config_1.default.services.line.name, lineServiceInstance);
        lineServiceInstance = typedi_1.Container.get(config_1.default.services.line.name);
        const mock = sinon.stub(lineServiceInstance, "filterByName").returns(Result_1.Result.ok([{
                "key": req.body.key,
                "name": req.body.name,
                "color": req.body.color,
                "linePaths": req.body.linePaths,
                "allowedDrivers": req.body.allowedDrivers,
                "disallowedDrivers": req.body.disallowedDrivers,
                "allowedVehicles": req.body.allowedVehicles,
                "disallowedVehicles": req.body.disallowedVehicles
            }]));
        const ctrl = new lineController_1.default(lineServiceInstance);
        await ctrl.createLine(req, res, next);
        await ctrl.createLine(req2, res2, next);
        await ctrl.filterByName(req3, res3, next);
        sinon.assert.calledOnce(mock);
        sinon.assert.calledWith(mock, sinon.match("b"));
        mock.restore();
    });
    it('filterByCode: returns json with array of lines by code', async function () {
        let body = {
            "key": '1',
            "name": 'b',
            "color": "cor bonita",
            "linePaths": null,
            "allowedDrivers": null,
            "disallowedDrivers": null,
            "allowedVehicles": null,
            "disallowedVehicles": null,
        };
        let body2 = {
            "key": "atestList2",
            "name": "atestList2",
            "color": "cor bonita2",
            "linePaths": null,
            "allowedDrivers": null,
            "disallowedDrivers": null,
            "allowedVehicles": null,
            "disallowedVehicles": null,
        };
        let req = {};
        let req2 = {};
        let req3 = {};
        req.body = body;
        req2.body = body2;
        let param = {
            "key": "1"
        };
        req3.params = param;
        let res = {};
        let res2 = {};
        let res3 = {
            json: sinon.spy()
        };
        let next = () => { };
        let lineServiceClass = require(config_1.default.services.line.path).default;
        let lineServiceInstance = typedi_1.Container.get(lineServiceClass);
        typedi_1.Container.set(config_1.default.services.line.name, lineServiceInstance);
        lineServiceInstance = typedi_1.Container.get(config_1.default.services.line.name);
        const mock = sinon.stub(lineServiceInstance, "filterCode").returns(Result_1.Result.ok([{
                "key": req.body.key,
                "name": req.body.name,
                "color": req.body.color,
                "linePaths": req.body.linePaths,
                "allowedDrivers": req.body.allowedDrivers,
                "disallowedDrivers": req.body.disallowedDrivers,
                "allowedVehicles": req.body.allowedVehicles,
                "disallowedVehicles": req.body.disallowedVehicles
            }]));
        const ctrl = new lineController_1.default(lineServiceInstance);
        await ctrl.createLine(req, res, next);
        await ctrl.createLine(req2, res2, next);
        await ctrl.filterByCode(req3, res3, next);
        sinon.assert.calledOnce(mock);
        sinon.assert.calledWith(mock, sinon.match("1"));
        mock.restore();
    });
});
//# sourceMappingURL=lineController.test.js.map