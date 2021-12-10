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
const driver_1 = require("../../models/driver");
const driverService_1 = __importDefault(require("../driverService"));
const Result_1 = require("../../core/logic/Result");
describe('driverController', function () {
    beforeEach(function () {
    });
    let driverSchemaClass = require("../../persistence/schemas/driverSchema").default;
    typedi_1.Container.set('driverSchema', driverSchemaClass);
    let driverRepoClass = require("../../repo/driverRepo").default;
    let driverRepoInstance = typedi_1.Container.get(driverRepoClass);
    typedi_1.Container.set(config_1.default.repos.driver.name, driverRepoInstance);
    it('createDriver: returns json with description value', async function () {
        const body = {
            name: '1',
            description: '1'
        };
        const resu = driver_1.Driver.create(body).getValue();
        driverRepoInstance = typedi_1.Container.get(config_1.default.repos.driver.name);
        sinon.stub(driverRepoInstance, "save").returns(Result_1.Result.ok(resu));
        const serv = new driverService_1.default(driverRepoInstance);
        const res = await (await serv.createDriver(body)).getValue();
        sinon.assert.match(res, body);
    });
});
//# sourceMappingURL=driverService.test.js.map