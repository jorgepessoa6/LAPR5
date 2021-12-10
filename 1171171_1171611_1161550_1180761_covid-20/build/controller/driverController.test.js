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
const driverController_1 = __importDefault(require("./driverController"));
describe('driver controller', function () {
    beforeEach(function () {
    });
    it('createDriver: returns json with name+description values', async function () {
        let body = { "name": 'driver12',
            "description": "sdfgh" };
        let req = {};
        req.body = body;
        let res = {
            json: sinon.spy()
        };
        let next = () => { };
        let driverServiceClass = require(config_1.default.services.driver.path).default;
        let driverServiceInstance = typedi_1.Container.get(driverServiceClass);
        typedi_1.Container.set(config_1.default.services.driver.name, driverServiceInstance);
        driverServiceInstance = typedi_1.Container.get(config_1.default.services.driver.name);
        const mock = sinon.stub(driverServiceInstance, "createDriver").returns(Result_1.Result.ok({ "name": req.body.name,
            "description": req.body.description }));
        const ctrl = new driverController_1.default(driverServiceInstance);
        await ctrl.createDriver(req, res, next);
        sinon.assert.calledOnce(mock);
        sinon.assert.calledWith(mock, sinon.match({ "name": req.body.name, "description": req.body.description }));
        mock.restore();
    });
});
//# sourceMappingURL=driverController.test.js.map