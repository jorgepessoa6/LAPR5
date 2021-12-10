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
const config_1 = __importDefault(require("../config"));
const Result_1 = require("../core/logic/Result");
const vehicleController_1 = __importDefault(require("./vehicleController"));
describe('vehicle controller', function () {
    beforeEach(function () {
    });
    it('createVehicle: returns json with name+autonomy+cost+averageSpeed+energySource+consumption+emissions values', async function () {
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
        let vehicleServiceClass = require(config_1.default.services.vehicle.path).default;
        let vehicleServiceInstance = typedi_1.Container.get(vehicleServiceClass);
        typedi_1.Container.set(config_1.default.services.vehicle.name, vehicleServiceInstance);
        vehicleServiceInstance = typedi_1.Container.get(config_1.default.services.vehicle.name);
        const mock = sinon.stub(vehicleServiceInstance, "createVehicle").returns(Result_1.Result.ok({
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
        const ctrl = new vehicleController_1.default(vehicleServiceInstance);
        await ctrl.createVehicle(req, res, next);
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
//# sourceMappingURL=vehicleController.test.js.map