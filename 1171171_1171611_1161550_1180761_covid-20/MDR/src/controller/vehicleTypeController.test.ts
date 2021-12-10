import * as sinon from 'sinon';

import { Response, Request, NextFunction } from 'express';

import { Container } from 'typedi';
import config from "../config";

import { Result } from '../core/logic/Result';

import IVehicleTypeService from "../services/IServices/IVehicleTypeService";
import VehicleTypeController from "./vehicleTypeController";
import vehicleTypeDTO from '../dto/VehicleType/vehicleTypeDTO';
import { assert } from 'console';

describe('vehicleType controller', function () {
	beforeEach(function() {
    });

    it('createVehicleType: returns json with name+autonomy+cost+averageSpeed+energySource+consumption+emissions values', async function () {
		let body = { "name":'vehicle142' ,
					"autonomy": "20",
					"cost":"45",
					"averageSpeed":"50",
					"energySource": "1",
					"consumption": "30",
					"emissions" : "5",
					"ParametersValues":null,
					"Vehicles":null};
        let req: Partial<Request> = {};
		req.body = body;

        let res: Partial<Response> = {
			json: sinon.spy()
        };
		let next: Partial<NextFunction> = () => {};

		let vehicleTypeServiceClass = require(config.services.vehicleType.path).default;
		let vehicleTypeServiceInstance = Container.get(vehicleTypeServiceClass)
		Container.set(config.services.vehicleType.name, vehicleTypeServiceInstance);

		vehicleTypeServiceInstance = Container.get(config.services.vehicleType.name);
		const mock = sinon.stub(vehicleTypeServiceInstance, "createVehicleType").returns( Result.ok<vehicleTypeDTO>( {
			"name": req.body.name,
			"autonomy":req.body.autonomy,
			"cost": req.body.cost,
		 	"averageSpeed": req.body.averageSpeed,
			"energySource": req.body.energySource,
			"consumption": req.body.consumption,
			"emissions": req.body.emissions,
			"ParametersValues": null,
			"Vehicles":null} ));

		const ctrl = new VehicleTypeController(vehicleTypeServiceInstance as IVehicleTypeService);

		await ctrl.createVehicleType(<Request>req, <Response>res, <NextFunction>next);

		
		sinon.assert.calledOnce(mock);
		sinon.assert.calledWith(mock, sinon.match({"name": req.body.name,
		"autonomy":req.body.autonomy,
		"cost": req.body.cost,
		"averageSpeed": req.body.averageSpeed,
		"energySource": req.body.energySource,
		"consumption": req.body.consumption,
		"emissions": req.body.emissions,
		"ParametersValues": null,
		"Vehicles": null}));
		mock.restore();
	});
});