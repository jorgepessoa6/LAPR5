import * as sinon from 'sinon';
import { Response, Request, NextFunction } from 'express';
import { Container } from 'typedi';
import config from '../../config';
import { Driver } from '../../models/driver';
import IDriverDTO from '../../dto/Driver/driverDTO';
import DriverService from '../driverService';
import IDriverRepo from '../../repo/IRepo/IDriverRepo';
import { Result } from '../../core/logic/Result';


describe('driverController', function () {
	beforeEach(function () {
	});


	let driverSchemaClass = require("../../persistence/schemas/driverSchema").default;
	Container.set('driverSchema', driverSchemaClass);

	let driverRepoClass = require("../../repo/driverRepo").default;
	let driverRepoInstance = Container.get(driverRepoClass);
	Container.set(config.repos.driver.name, driverRepoInstance);


	it('createDriver: returns json with description value', async function () {

		const body = {
			name: '1',
			description: '1'
		} as IDriverDTO;

		const resu = Driver.create(body).getValue();
		driverRepoInstance = Container.get(config.repos.driver.name);
		sinon.stub(driverRepoInstance, "save").returns(Result.ok<Driver>(resu));

		const serv = new DriverService(driverRepoInstance as IDriverRepo);


		const res = await (await serv.createDriver(body)).getValue();

		sinon.assert.match(res, body);
	});

});
