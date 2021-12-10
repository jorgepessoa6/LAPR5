"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sinon = __importStar(require("sinon"));
const typedi_1 = require("typedi");
const config_1 = __importDefault(require("../../config"));
const vehicle_1 = require("../../models/vehicle");
const vehicleService_1 = __importDefault(require("../vehicleService"));
const Result_1 = require("../../core/logic/Result");
describe('vehicleController', function () {
    beforeEach(function () {
    });
    let vehicleSchemaClass = require("../../persistence/schemas/vehicleSchema").default;
    typedi_1.Container.set('vehicleSchema', vehicleSchemaClass);
    let vehicleRepoClass = require("../../repo/vehicleRepo").default;
    let vehicleRepoInstance = typedi_1.Container.get(vehicleRepoClass);
    typedi_1.Container.set(config_1.default.repos.vehicle.name, vehicleRepoInstance);
    it('createVehicle: returns json with description value', async function () {
        const body = {
            name: '1',
            autonomy: 1,
            cost: 1,
            averageSpeed: 1,
            energySource: 1,
            consumption: 1,
            emissions: 1
        };
        const resu = vehicle_1.Vehicle.create(body).getValue();
        vehicleRepoInstance = typedi_1.Container.get(config_1.default.repos.vehicle.name);
        sinon.stub(vehicleRepoInstance, "save").returns(Result_1.Result.ok(resu));
        const serv = new vehicleService_1.default(vehicleRepoInstance);
        const res = await (await serv.createVehicle(body)).getValue();
        sinon.assert.match(res, body);
    });
});
//# sourceMappingURL=vehicleService.test.js.map