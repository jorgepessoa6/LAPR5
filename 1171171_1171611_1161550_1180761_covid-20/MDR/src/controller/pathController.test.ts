import * as sinon from 'sinon';

import { Response, Request, NextFunction } from 'express';

import { Container } from 'typedi';
import config from "../config";

import { Result } from '../core/logic/Result';

import IPathService from "../services/IServices/IPathService";
import PathController from "./pathController";
import pathDTO from '../dto/Path/pathDTO';
import IPathDTO from '../dto/Path/pathDTO';

describe('path controller', function () {
	beforeEach(function() {
	});

    it('createPath: returns json with key+isEmpty+pathNodes values', async function () {
		let body = { "idLinha": "Line:1",
        "linePathID": "LinePath:101",
        "orientation": "Go",
        "key": "Path:101",
        "isEmpty": false,
        "pathNodes": { "pathNode": [{"key": "PathNode:102","node": "Node:1"}, {"key": "PathNode:103","node": "Node:2","duration":4,"distance":5}]}};
        let req: Partial<Request> = {};
		req.body = body;

        let res: Partial<Response> = {
			json: sinon.spy()
        };
		let next: Partial<NextFunction> = () => {};

		let pathServiceClass = require(config.services.path.path).default;
		let pathServiceInstance = Container.get(pathServiceClass)
		Container.set(config.services.path.name, pathServiceInstance);

		pathServiceInstance = Container.get(config.services.path.name);
		const mock = sinon.stub(pathServiceInstance, "createPath").returns( Result.ok<pathDTO>( {"idLinha":req.body.idLinha,"linePathID": req.body.linePathID, "orientation": req.body.orientation,"key":req.body.key, 
		"isEmpty": req.body.isEmpty, "pathNodes": req.body.pathNodes} ));

		const ctrl = new PathController(pathServiceInstance as IPathService);

		await ctrl.createPath(<Request>req, <Response>res, <NextFunction>next);

		
		sinon.assert.calledOnce(mock);
		sinon.assert.calledWith(mock, sinon.match({"idLinha":req.body.idLinha,"linePathID": req.body.linePathID, "orientation": req.body.orientation,"key":req.body.key, 
		"isEmpty": req.body.isEmpty, "pathNodes": req.body.pathNodes}));
		mock.restore();
	});


	it('listPathsOfLine: returns json with array of linhas', async function () {

		let body = {
			"idLinha": "Line:1",
			"linePathID": "LinePath:101",
			"orientation": "Go",
			"keyP": "Path:101",
			"isEmpty": false,
			"pathNodes": { "pathNode": [{"key": "PathNode:102","node": "Node:1"}, {"key": "PathNode:103","node": "Node:2","duration":4,"distance":5}]}
		};

		let body3 = {
			"key": "Line:1"
		};

		let req: Partial<Request> = {};
		let req3: Partial<Request> = {};
		req.body = body;
		req3.params = body3;

		let res: Partial<Response> = {};
		let res3: Partial<Response> = {
			json: sinon.spy()
		};
		let next: Partial<NextFunction> = () => { };

		let pathServiceClass = require(config.services.path.path).default;
		let pathServiceInstance = Container.get(pathServiceClass)
		Container.set(config.services.path.name, pathServiceInstance);
		pathServiceInstance = Container.get(config.services.path.name);
		const mock = sinon.stub(pathServiceInstance, "listPathsByLine").returns(Result.ok<IPathDTO[]>([{
			"idLinha": req.body.idLinha,
			"linePathID": req.body.linePathID,
			"orientation": req.body.orientation,
			"key": req.body.keyP,
			"isEmpty": req.body.isEmpty,
			"pathNodes": req.body.pathNodes
		}]));

		const ctrl = new PathController(pathServiceInstance as IPathService);


		await ctrl.createPath(<Request>req, <Response>res, <NextFunction>next);
		await ctrl.listPathsByLine(<Request>req3, <Response>res3, <NextFunction>next);

		sinon.assert.calledOnce(mock);
		sinon.assert.calledWith(mock, sinon.match("Line:1"));
		mock.restore();
	});
});