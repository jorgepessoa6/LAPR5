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
const vehicleType_1 = require("../../models/vehicleType");
const vehicleTypeService_1 = __importDefault(require("../vehicleTypeService"));
const Result_1 = require("../../core/logic/Result");
describe('vehicleTypeController', function () {
    beforeEach(function () {
    });
    let vehicleTypeSchemaClass = require("../../persistence/schemas/vehicleTypeSchema").default;
    typedi_1.Container.set('vehicleTypeSchema', vehicleTypeSchemaClass);
    let vehicleTypeRepoClass = require("../../repo/vehicleTypeRepo").default;
    let vehicleTypeRepoInstance = typedi_1.Container.get(vehicleTypeRepoClass);
    typedi_1.Container.set(config_1.default.repos.vehicleType.name, vehicleTypeRepoInstance);
    it('createVehicleType: returns json with description value', async function () {
        const body = {
            name: '1',
            autonomy: 1,
            cost: 1,
            averageSpeed: 1,
            energySource: 1,
            consumption: 1,
            emissions: 1
        };
        const resu = vehicleType_1.VehicleType.create(body).getValue();
        vehicleTypeRepoInstance = typedi_1.Container.get(config_1.default.repos.vehicleType.name);
        sinon.stub(vehicleTypeRepoInstance, "save").returns(Result_1.Result.ok(resu));
        const serv = new vehicleTypeService_1.default(vehicleTypeRepoInstance);
        const res = await (await serv.createVehicleType(body)).getValue();
        sinon.assert.match(res, body);
    });
});
//# sourceMappingURL=vehicleTypeService.test.js.map