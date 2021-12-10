import * as sinon from 'sinon';
import { Response, Request, NextFunction } from 'express';
import { Container } from 'typedi';
import config from '../../config';
import { VehicleType } from '../../models/vehicleType';
import IVehicleTypeDTO from '../../dto/VehicleType/vehicleTypeDTO';
import VehicleTypeService from '../vehicleTypeService';
import IVehicleTypeRepo from '../../repo/IRepo/IVehicleTypeRepo';
import { Result } from '../../core/logic/Result';


describe('vehicleTypeController', function () {
	beforeEach(function () {
	});


	let vehicleTypeSchemaClass = require("../../persistence/schemas/vehicleTypeSchema").default;
	Container.set('vehicleTypeSchema', vehicleTypeSchemaClass);

	let vehicleTypeRepoClass = require("../../repo/vehicleTypeRepo").default;
	let vehicleTypeRepoInstance = Container.get(vehicleTypeRepoClass);
	Container.set(config.repos.vehicleType.name, vehicleTypeRepoInstance);


	it('createVehicleType: returns json with description value', async function () {

		const body = {
			name: '1',
            autonomy: 1,
            cost: 1,
            averageSpeed:1,
            energySource:1,
            consumption:1,
            emissions:1
		} as IVehicleTypeDTO;

		const resu = VehicleType.create(body).getValue();
		vehicleTypeRepoInstance = Container.get(config.repos.vehicleType.name);
		sinon.stub(vehicleTypeRepoInstance, "save").returns(Result.ok<VehicleType>(resu));

		const serv = new VehicleTypeService(vehicleTypeRepoInstance as IVehicleTypeRepo);


		const res = await (await serv.createVehicleType(body)).getValue();

		sinon.assert.match(res, body);
	});

});
