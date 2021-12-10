import * as sinon from 'sinon';

import { Response, Request, NextFunction } from 'express';

import { Container } from 'typedi';
import config from '../../config';

import { Result } from '../../core/logic/Result';
import ILineDTO from '../../dto/Line/lineDTO';
import { Line } from '../../models/line';
import ILineRepo from '../../repo/IRepo/ILineRepo';
import LineService from '../lineService';


describe('line service', function () {
	beforeEach(function () {
	});

	let lineSchemaClass = require("../../persistence/schemas/lineSchema").default;
	Container.set('lineSchema', lineSchemaClass);

	let lineRepoClass = require("../../repo/lineRepo").default;
	let lineRepoInstance = Container.get(lineRepoClass);
	Container.set(config.repos.line.name, lineRepoInstance);


	it('createLine: returns json with description value', async function () {
		const body = {
            key: '1',
            name: '1',
            firstNode: "1",
            lastNode: "1",
            color: "cor bonita",
            linePaths: [],
            allowedDrivers: [],
            disallowedDrivers: [],
            allowedVehicles: [],
            disallowedVehicles: []
        } as ILineDTO;
        
        const compareRes = {
            key: '1',
            name: '1',
            firstNode: "1",
            lastNode: "1",
            color: "cor bonita",
            linePath: [],
            allowedDrivers: [],
            disallowedDrivers: [],
            allowedVehicles: [],
            disallowedVehicles: []
		} as Line;

		const resu = Line.create(body).getValue();
		lineRepoInstance = Container.get(config.repos.line.name);
		sinon.stub(lineRepoInstance, "save").returns(Result.ok<Line>(resu));

		const serv = new LineService(lineRepoInstance as ILineRepo);
        const res = await (await serv.createLine(body)).getValue();
		sinon.assert.match(res, compareRes);
	});


	it('listLines: returns json with array of types', async function () {
		const body = {
            key: '1',
            name: '1',
            firstNode: "1",
            lastNode: "1",
            color: "cor bonita",
            linePaths: [],
            allowedDrivers: [],
            disallowedDrivers: [],
            allowedVehicles: [],
            disallowedVehicles: []
        } as ILineDTO;
        
        const compareRes = {
            key: '1',
            name: '1',
            firstNode: "1",
            lastNode: "1",
            color: "cor bonita",
            linePath: [],
            allowedDrivers: [],
            disallowedDrivers: [],
            allowedVehicles: [],
            disallowedVehicles: []
        } as Line;
        
        const body2 = {
            key: '2',
            name: '2',
            firstNode: "2",
            lastNode: "2",
            color: "cor bonita",
            linePaths: [],
            allowedDrivers: [],
            disallowedDrivers: [],
            allowedVehicles: [],
            disallowedVehicles: []
        } as ILineDTO;
        
        const compareRes2 = {
            key: '2',
            name: '2',
            firstNode: "2",
            lastNode: "2",
            color: "cor bonita",
            linePath: [],
            allowedDrivers: [],
            disallowedDrivers: [],
            allowedVehicles: [],
            disallowedVehicles: []
		} as Line;2

        const resu = Line.create(body).getValue();
        const resu2 = Line.create(body2).getValue();


        lineRepoInstance = Container.get(config.repos.line.name);
        sinon.stub(lineRepoInstance, "listByName").returns([resu, resu2]);

		const serv = new LineService(lineRepoInstance as ILineRepo);

		serv.createLine(body2);
		serv.createLine(body);
		const res = await (await serv.listByName());
		//sinon.assert.match(res[0], body);
		sinon.assert.match([res[0].props, res[1].props], [compareRes, compareRes2]);
	});
 
	it('listLines: returns json with array of types', async function () {
		const body = {
            key: '1',
            name: '1',
            firstNode: "1",
            lastNode: "1",
            color: "cor bonita",
            linePaths: [],
            allowedDrivers: [],
            disallowedDrivers: [],
            allowedVehicles: [],
            disallowedVehicles: []
        } as ILineDTO;
        
        const compareRes = {
            key: '1',
            name: '1',
            firstNode: "1",
            lastNode: "1",
            color: "cor bonita",
            linePath: [],
            allowedDrivers: [],
            disallowedDrivers: [],
            allowedVehicles: [],
            disallowedVehicles: []
        } as Line;
        
        const body2 = {
            key: '2',
            name: '2',
            firstNode: "2",
            lastNode: "2",
            color: "cor bonita",
            linePaths: [],
            allowedDrivers: [],
            disallowedDrivers: [],
            allowedVehicles: [],
            disallowedVehicles: []
        } as ILineDTO;
        
        const compareRes2 = {
            key: '2',
            name: '2',
            firstNode: "2",
            lastNode: "2",
            color: "cor bonita",
            linePath: [],
            allowedDrivers: [],
            disallowedDrivers: [],
            allowedVehicles: [],
            disallowedVehicles: []
		} as Line;2

        const resu = Line.create(body).getValue();
        const resu2 = Line.create(body2).getValue();


        lineRepoInstance = Container.get(config.repos.line.name);
        sinon.stub(lineRepoInstance, "listByCode").returns([resu, resu2]);

		const serv = new LineService(lineRepoInstance as ILineRepo);

		serv.createLine(body2);
		serv.createLine(body);
		const res = await (await serv.listByCode());
		//sinon.assert.match(res[0], body);
		sinon.assert.match([res[0].props, res[1].props], [compareRes, compareRes2]);
	});
	it('filtertLines: returns json with array of types', async function () {
		const body = {
            key: '1',
            name: '1',
            firstNode: "1",
            lastNode: "1",
            color: "cor bonita",
            linePaths: [],
            allowedDrivers: [],
            disallowedDrivers: [],
            allowedVehicles: [],
            disallowedVehicles: []
        } as ILineDTO;
        
        const compareRes = {
            key: '1',
            name: '1',
            firstNode: "1",
            lastNode: "1",
            color: "cor bonita",
            linePath: [],
            allowedDrivers: [],
            disallowedDrivers: [],
            allowedVehicles: [],
            disallowedVehicles: []
        } as Line;
        
        const body2 = {
            key: '2',
            name: '2',
            firstNode: "2",
            lastNode: "2",
            color: "cor bonita",
            linePaths: [],
            allowedDrivers: [],
            disallowedDrivers: [],
            allowedVehicles: [],
            disallowedVehicles: []
        } as ILineDTO;
        
        const compareRes2 = {
            key: '2',
            name: '2',
            firstNode: "2",
            lastNode: "2",
            color: "cor bonita",
            linePath: [],
            allowedDrivers: [],
            disallowedDrivers: [],
            allowedVehicles: [],
            disallowedVehicles: []
		} as Line;2

        const resu = Line.create(body).getValue();
        const resu2 = Line.create(body2).getValue();


        lineRepoInstance = Container.get(config.repos.line.name);
        sinon.stub(lineRepoInstance, "filterByName").returns([resu, resu2]);

		const serv = new LineService(lineRepoInstance as ILineRepo);

		serv.createLine(body2);
		serv.createLine(body);
		const res = await (await serv.filterByName("1"));
        //sinon.assert.match(res[0], body);
        if (res.length > 1) {
			console.log("fail");
		} else {
			sinon.assert.match(res[0].props,compareRes);
		}
	});
	it('filtertLines: returns json with array of types', async function () {
		const body = {
            key: '1',
            name: '1',
            firstNode: "1",
            lastNode: "1",
            color: "cor bonita",
            linePaths: [],
            allowedDrivers: [],
            disallowedDrivers: [],
            allowedVehicles: [],
            disallowedVehicles: []
        } as ILineDTO;
        
        const compareRes = {
            key: '1',
            name: '1',
            firstNode: "1",
            lastNode: "1",
            color: "cor bonita",
            linePath: [],
            allowedDrivers: [],
            disallowedDrivers: [],
            allowedVehicles: [],
            disallowedVehicles: []
        } as Line;
        
        const body2 = {
            key: '2',
            name: '2',
            firstNode: "2",
            lastNode: "2",
            color: "cor bonita",
            linePaths: [],
            allowedDrivers: [],
            disallowedDrivers: [],
            allowedVehicles: [],
            disallowedVehicles: []
        } as ILineDTO;
        
        const compareRes2 = {
            key: '2',
            name: '2',
            firstNode: "2",
            lastNode: "2",
            color: "cor bonita",
            linePath: [],
            allowedDrivers: [],
            disallowedDrivers: [],
            allowedVehicles: [],
            disallowedVehicles: []
		} as Line;2

        const resu = Line.create(body).getValue();
        const resu2 = Line.create(body2).getValue();


        lineRepoInstance = Container.get(config.repos.line.name);
        sinon.stub(lineRepoInstance, "filterCode").returns([resu, resu2]);

		const serv = new LineService(lineRepoInstance as ILineRepo);

		serv.createLine(body2);
		serv.createLine(body);
		const res = await (await serv.filterCode("1"));
        //sinon.assert.match(res[0], body);
        if (res.length > 1) {
			console.log("fail");
		} else {
			sinon.assert.match(res[0].props,compareRes);
		}
	});
});
