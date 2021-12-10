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
const vehicleTypeController_1 = __importDefault(require("./vehicleTypeController"));
describe('vehicleType controller', function () {
    beforeEach(function () {
    });
    it('createVehicleType: returns json with name+autonomy+cost+averageSpeed+energySource+consumption+emissions values', async function () {
        let body = { "name": 'vehicle142',
            "autonomy": "20",
            "cost": "45",
            "averageSpeed": "50",
            "energySource": "1",
            "consumption": "30",
            "emissions": "5",
            "ParametersValues": null,
            "Vehicles": null };
        let req = {};
        req.body = body;
        let res = {
            json: sinon.spy()
        };
        let next = () => { };
        let vehicleTypeServiceClass = require(config_1.default.services.vehicleType.path).default;
        let vehicleTypeServiceInstance = typedi_1.Container.get(vehicleTypeServiceClass);
        typedi_1.Container.set(config_1.default.services.vehicleType.name, vehicleTypeServiceInstance);
        vehicleTypeServiceInstance = typedi_1.Container.get(config_1.default.services.vehicleType.name);
        const mock = sinon.stub(vehicleTypeServiceInstance, "createVehicleType").returns(Result_1.Result.ok({
            "name": req.body.name,
            "autonomy": req.body.autonomy,
            "cost": req.body.cost,
            "averageSpeed": req.body.averageSpeed,
            "energySource": req.body.energySource,
            "consumption": req.body.consumption,
            "emissions": req.body.emissions,
            "ParametersValues": null,
            "Vehicles": null
        }));
        const ctrl = new vehicleTypeController_1.default(vehicleTypeServiceInstance);
        await ctrl.createVehicleType(req, res, next);
        sinon.assert.calledOnce(mock);
        sinon.assert.calledWith(mock, sinon.match({ "name": req.body.name,
            "autonomy": req.body.autonomy,
            "cost": req.body.cost,
            "averageSpeed": req.body.averageSpeed,
            "energySource": req.body.energySource,
            "consumption": req.body.consumption,
            "emissions": req.body.emissions,
            "ParametersValues": null,
            "Vehicles": null }));
        mock.restore();
    });
});
//# sourceMappingURL=vehicleTypeController.test.js.map