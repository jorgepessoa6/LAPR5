import * as sinon from 'sinon';

import { Response, Request, NextFunction } from 'express';

import { Container } from 'typedi';
import config from '../../config';


import { Path } from '../../models/path';
import IPathDTO from '../../dto/Path/pathDTO';
import PathService from '../pathService';
import IPathRepo from '../../repo/IRepo/IPathRepo';
import { Result } from '../../core/logic/Result';
import ILineRepo from '../../repo/IRepo/ILineRepo';


describe('pathController', function () {
	beforeEach(function () {
	});


	let pathSchemaClass = require("../../persistence/schemas/pathSchema").default;
    Container.set('pathSchema', pathSchemaClass);
    
    let lineSchemaClass = require("../../persistence/schemas/lineSchema").default;
    Container.set('lineSchema', lineSchemaClass);

	let pathRepoClass = require("../../repo/pathRepo").default;
	let pathRepoInstance = Container.get(pathRepoClass);
    Container.set(config.repos.path.name, pathRepoInstance);
    
    let lineRepoClass = require("../../repo/lineRepo").default;
	let lineRepoInstance = Container.get(lineRepoClass);
	Container.set(config.repos.line.name, lineRepoInstance);


	it('createPath: returns json with description value', async function () {

		const body = {
            "idLinha": "Line:1",
            "linePathID": "LinePath:101",
            "orientation": "Go",
            "key": "Path:101",
            "isEmpty": false,
            "pathNodes":[{"key": "PathNode:102","node": "Node:1"}, {"key": "PathNode:103","node": "Node:2","duration":4,"distance":5}]
        } as IPathDTO;
        
        const body2 = {
            "key": "Path:101",
            "isEmpty": false,
            "pathNodes":[{"key": "PathNode:102","node": "Node:1"}, {"key": "PathNode:103","node": "Node:2","duration":4,"distance":5}]
		} as Path;

		const resu = Path.create(body).getValue();
        pathRepoInstance = Container.get(config.repos.path.name);
        lineRepoInstance = Container.get(config.repos.line.name);
		sinon.stub(pathRepoInstance, "save").returns(Result.ok<Path>(resu));

        const serv = new PathService(pathRepoInstance as IPathRepo, lineRepoInstance as ILineRepo);

		const res = await (await serv.createPathImport(body)).getValue();

		sinon.assert.match(res, body2);
    })
/*
    it('listNodes by code : returns json with sorted array of types', async function () {

		const body = {
            "idLinha": "Line:1",
            "linePathID": "LinePath:101",
            "orientation": "Go",
            "key": "Path:101",
            "isEmpty": false,
            "pathNodes":[{"key": "PathNode:102","node": "Node:1"}, {"key": "PathNode:103","node": "Node:2","duration":4,"distance":5}]
		} as IPathDTO;

		const resu = Path.create(body).getValue();

		pathRepoInstance = Container.get(config.repos.path.name);
		sinon.stub(pathRepoInstance, "listPathsByLine").returns([resu]);

        const serv = new PathService(pathRepoInstance as IPathRepo, lineRepoInstance as ILineRepo);
        
		serv.createPath(body);
		const res = await (await serv.listPathsByLine("Line:1"));
		sinon.assert.match([res[0].props], [body]);
    });
    */
});
