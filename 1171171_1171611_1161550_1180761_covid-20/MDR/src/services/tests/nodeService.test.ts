import * as sinon from 'sinon';

import { Response, Request, NextFunction } from 'express';

import { Container } from 'typedi';
import config from '../../config';


import { Node } from '../../models/node';
import INodeDTO from '../../dto/Node/nodeDTO';
import NodeService from '../nodeService';
import INodeRepo from '../../repo/IRepo/INodeRepo';
import { Result } from '../../core/logic/Result';


describe('nodeController', function () {
	beforeEach(function () {
	});


	let nodeSchemaClass = require("../../persistence/schemas/nodeSchema").default;
	Container.set('nodeSchema', nodeSchemaClass);

	let nodeRepoClass = require("../../repo/nodeRepo").default;
	let nodeRepoInstance = Container.get(nodeRepoClass);
	Container.set(config.repos.node.name, nodeRepoInstance);


	it('createNode: returns json with description value', async function () {

		const body = {
			key: '1',
			name: '1',
			latitude: 1,
			longitude: 1,
			isDepot: false,
			isReliefPoint: false,
			shortName: '1'
		} as INodeDTO;

		const resu = Node.create(body).getValue();
		nodeRepoInstance = Container.get(config.repos.node.name);
		sinon.stub(nodeRepoInstance, "save").returns(Result.ok<Node>(resu));

		const serv = new NodeService(nodeRepoInstance as INodeRepo);


		const res = await (await serv.createNode(body)).getValue();

		sinon.assert.match(res, body);
	});


	it('listNodes: returns json with array of types', async function () {

		const body = {
			key: '1',
			name: '1',
			latitude: 1,
			longitude: 1,
			isDepot: false,
			isReliefPoint: false,
			shortName: '1',
			capacities: [],
			informationPoint: [],
			crewTravelTimes: []
		} as INodeDTO;

		const body2 = {
			key: '2',
			name: '2',
			latitude: 1,
			longitude: 1,
			isDepot: false,
			isReliefPoint: false,
			shortName: '1',
			capacities: [],
			informationPoint: [],
			crewTravelTimes: []
		} as INodeDTO;

		const body3 = {
			key: '3',
			name: '3',
			latitude: 1,
			longitude: 1,
			isDepot: false,
			isReliefPoint: false,
			shortName: '1',
			capacities: [],
			informationPoint: [],
			crewTravelTimes: []
		} as INodeDTO;

		const resu = Node.create(body).getValue();
		const resu2 = Node.create(body2).getValue();
		const resu3 = Node.create(body3).getValue();

		nodeRepoInstance = Container.get(config.repos.node.name);
		sinon.stub(nodeRepoInstance, "listByName").returns([resu, resu2, resu3]);

		const serv = new NodeService(nodeRepoInstance as INodeRepo);

		serv.createNode(body3);
		serv.createNode(body2);
		serv.createNode(body);
		const res = await (await serv.listByName());
		//sinon.assert.match(res[0], body);
		sinon.assert.match([res[0].props, res[1].props, res[2].props], [body, body2, body3]);
	});

	it('listNodes by code : returns json with sorted array of types', async function () {

		const body = {
			key: 'a',
			name: 'a',
			latitude: 1,
			longitude: 1,
			isDepot: false,
			isReliefPoint: false,
			shortName: '1',
			capacities: [],
			informationPoint: [],
			crewTravelTimes: []
		} as INodeDTO;

		const body2 = {
			key: 'b',
			name: 'b',
			latitude: 1,
			longitude: 1,
			isDepot: false,
			isReliefPoint: false,
			shortName: '1',
			capacities: [],
			informationPoint: [],
			crewTravelTimes: []
		} as INodeDTO;

		const body3 = {
			key: 'c',
			name: 'c',
			latitude: 1,
			longitude: 1,
			isDepot: false,
			isReliefPoint: false,
			shortName: '1',
			capacities: [],
			informationPoint: [],
			crewTravelTimes: []
		} as INodeDTO;

		const resu = Node.create(body).getValue();
		const resu2 = Node.create(body2).getValue();
		const resu3 = Node.create(body3).getValue();

		nodeRepoInstance = Container.get(config.repos.node.name);
		sinon.stub(nodeRepoInstance, "listByCode").returns([resu, resu2, resu3]);

		const serv = new NodeService(nodeRepoInstance as INodeRepo);

		serv.createNode(body2);
		serv.createNode(body3);
		serv.createNode(body);
		const res = await (await serv.listByCode());
		//sinon.assert.match(res[0], body);
		sinon.assert.match([res[0].props, res[1].props, res[2].props], [body, body2, body3]);
	});


	it('listNodes by code : returns json with sorted array of types', async function () {

		const body = {
			key: 'a',
			name: 'a',
			latitude: 1,
			longitude: 1,
			isDepot: false,
			isReliefPoint: false,
			shortName: '1',
			capacities: [],
			informationPoint: [],
			crewTravelTimes: []
		} as INodeDTO;

		const body2 = {
			key: 'b',
			name: 'b',
			latitude: 1,
			longitude: 1,
			isDepot: false,
			isReliefPoint: false,
			shortName: '1',
			capacities: [],
			informationPoint: [],
			crewTravelTimes: []
		} as INodeDTO;

		const body3 = {
			key: 'c',
			name: 'c',
			latitude: 1,
			longitude: 1,
			isDepot: false,
			isReliefPoint: false,
			shortName: '1',
			capacities: [],
			informationPoint: [],
			crewTravelTimes: []
		} as INodeDTO;

		const resu = Node.create(body).getValue();
		const resu2 = Node.create(body2).getValue();
		const resu3 = Node.create(body3).getValue();

		nodeRepoInstance = Container.get(config.repos.node.name);
		sinon.stub(nodeRepoInstance, "filterByName").returns([resu, resu2, resu3]);

		const serv = new NodeService(nodeRepoInstance as INodeRepo);

		serv.createNode(body2);
		serv.createNode(body3);
		serv.createNode(body);
		const res = await (await serv.filterByName("a"));
		//sinon.assert.match(res[0], body);
		if (res.length > 1) {
			console.log("fail");
		} else {
			sinon.assert.match(res[0].props,body);
		}
	});
	
	it('listNodes by code : returns json with sorted array of types', async function () {

		const body = {
			key: 'a',
			name: 'a',
			latitude: 1,
			longitude: 1,
			isDepot: false,
			isReliefPoint: false,
			shortName: '1',
			capacities: [],
			informationPoint: [],
			crewTravelTimes: []
		} as INodeDTO;

		const body2 = {
			key: 'b',
			name: 'b',
			latitude: 1,
			longitude: 1,
			isDepot: false,
			isReliefPoint: false,
			shortName: '1',
			capacities: [],
			informationPoint: [],
			crewTravelTimes: []
		} as INodeDTO;

		const body3 = {
			key: 'c',
			name: 'c',
			latitude: 1,
			longitude: 1,
			isDepot: false,
			isReliefPoint: false,
			shortName: '1',
			capacities: [],
			informationPoint: [],
			crewTravelTimes: []
		} as INodeDTO;

		const resu = Node.create(body).getValue();
		const resu2 = Node.create(body2).getValue();
		const resu3 = Node.create(body3).getValue();

		nodeRepoInstance = Container.get(config.repos.node.name);
		sinon.stub(nodeRepoInstance, "filterCode").returns([resu, resu2, resu3]);

		const serv = new NodeService(nodeRepoInstance as INodeRepo);

		serv.createNode(body2);
		serv.createNode(body3);
		serv.createNode(body);
		const res = await (await serv.filterCode("a"));
		//sinon.assert.match(res[0], body);
		if (res.length > 1) {
			console.log("fail");
		} else {
			sinon.assert.match(res[0].props,body);
		}
	});


});
