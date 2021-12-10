import * as sinon from 'sinon';

import { Response, Request, NextFunction } from 'express';

import { Container } from 'typedi';
import config from "../config";

import { Result } from '../core/logic/Result';

import IDriverService from "../services/IServices/IDriverService";
import DriverController from "./driverController";
import driverDTO from '../dto/Driver/driverDTO';
import { assert } from 'console';

describe('driver controller', function () {
	beforeEach(function() {
    });

    it('createDriver: returns json with name+description values', async function () {
		let body = { "name":'driver12' ,
					"description": "sdfgh"};
        let req: Partial<Request> = {};
		req.body = body;

        let res: Partial<Response> = {
			json: sinon.spy()
        };
		let next: Partial<NextFunction> = () => {};

		let driverServiceClass = require(config.services.driver.path).default;
		let driverServiceInstance = Container.get(driverServiceClass)
		Container.set(config.services.driver.name, driverServiceInstance);

		driverServiceInstance = Container.get(config.services.driver.name);
		const mock = sinon.stub(driverServiceInstance, "createDriver").returns( Result.ok<driverDTO>(
			{"name": req.body.name, 
			"description": req.body.description} ));

		const ctrl = new DriverController(driverServiceInstance as IDriverService);

		await ctrl.createDriver(<Request>req, <Response>res, <NextFunction>next);

		
		sinon.assert.calledOnce(mock);
		sinon.assert.calledWith(mock, sinon.match({"name": req.body.name, "description": req.body.description}));
		mock.restore();
	});
});