import * as sinon from 'sinon';

import { Response, Request, NextFunction } from 'express';

import { Container } from 'typedi';
import config from "../config";

import { Result } from '../core/logic/Result';

import INodeService from "../services/IServices/INodeService";
import NodeController from "./nodeController";
import nodeDTO from '../dto/Node/nodeDTO';
import { assert } from 'console';
import INodeDTO from '../dto/Node/nodeDTO';

describe('node controller', function () {
    beforeEach(function () {
    });


    it('createNode: returns json with key+name+description values', async function () {
        let body = {
            "key": "ddw123",
            "name": "qw",
            "latitude": 2,
            "longitude": 3,
            "shortName": "short",
            "isDepot": false,
            "isReliefPoint": false,
            "capacities": null,
            "informationPoint": null,
            "crewTravelTimes": null

        };
        let req: Partial<Request> = {};
        req.body = body;

        let res: Partial<Response> = {
            json: sinon.spy()
        };
        let next: Partial<NextFunction> = () => { };

        let nodeServiceClass = require(config.services.node.path).default;
        let nodeServiceInstance = Container.get(nodeServiceClass)
        Container.set(config.services.node.name, nodeServiceInstance);

        nodeServiceInstance = Container.get(config.services.node.name);

        const mock = sinon.stub(nodeServiceInstance, "createNode").returns(Result.ok<nodeDTO>({
            "key": req.body.key,
            "name": req.body.name, "latitude": req.body.longitude, "longitude": req.body.longitude, "shortName": req.body.shortName,
            "isDepot": req.body.isDepot, "isReliefPoint": req.body.isReliefPoint, "capacities": null,
            "informationPoint": null, "crewTravelTimes": null
        }));

        const ctrl = new NodeController(nodeServiceInstance as INodeService);

        await ctrl.createNode(<Request>req, <Response>res, <NextFunction>next);


        sinon.assert.calledOnce(mock);
        sinon.assert.calledWith(mock, sinon.match({
            "key": req.body.key,
            "name": req.body.name, "latitude": req.body.latitude, "longitude": req.body.longitude, "shortName": req.body.shortName,
            "isDepot": req.body.isDepot, "isReliefPoint": req.body.isReliefPoint, "capacities": null,
            "informationPoint": null, "crewTravelTimes": null
        }));
        mock.restore();
    });

    it('listByName: returns json with array of nodes by name', async function () {

        let body = {
            "key": "btestList",
            "name": "btestList",
            "latitude": 2,
            "longitude": 3,
            "shortName": "short",
            "isDepot": false,
            "isReliefPoint": false,
            "capacities": null,
            "informationPoint": null,
            "crewTravelTimes": null
        };

        let body2 = {
            "key": "atestList2",
            "name": "atestList2",
            "latitude": 2,
            "longitude": 3,
            "shortName": "short",
            "isDepot": false,
            "isReliefPoint": false,
            "capacities": null,
            "informationPoint": null,
            "crewTravelTimes": null
        };

        let req: Partial<Request> = {};
        let req2: Partial<Request> = {};
        req.body = body;
        req2.body = body2;

        let res: Partial<Response> = {};
        let res2: Partial<Response> = {};
        let res3: Partial<Response> = {
            json: sinon.spy()
        };
        let next: Partial<NextFunction> = () => { };


        let nodeServiceClass = require(config.services.node.path).default;
        let nodeServiceInstance = Container.get(nodeServiceClass)
        Container.set(config.services.node.name, nodeServiceInstance);

        nodeServiceInstance = Container.get(config.services.node.name);
        const mock = sinon.stub(nodeServiceInstance, "listByName").returns(Result.ok<INodeDTO[]>([{
            "key": req.body.key,
            "name": req.body.name,
            "latitude": req.body.latitude,
            "longitude": req.body.longitude,
            "shortName": req.body.shortName,
            "isDepot": req.body.isDepot,
            "isReliefPoint": req.body.isReliefPoint,
            "informationPoint": req.body.informationPoint,
            "capacities": req.body.capacities,
            "crewTravelTimes": req.body.crewTravelTimes
        },
        {
            "key": req2.body.key,
            "name": req2.body.name,
            "latitude": req2.body.latitude,
            "longitude": req2.body.longitude,
            "shortName": req2.body.shortName,
            "isDepot": req2.body.isDepot,
            "isReliefPoint": req2.body.isReliefPoint,
            "informationPoint": req2.body.informationPoint,
            "capacities": req2.body.capacities,
            "crewTravelTimes": req2.body.crewTravelTimes
        }]));

        const ctrl = new NodeController(nodeServiceInstance as INodeService);


        await ctrl.createNode(<Request>req, <Response>res, <NextFunction>next);
        await ctrl.createNode(<Request>req2, <Response>res2, <NextFunction>next);
        await ctrl.listByName(<Response>res3, <NextFunction>next);

        sinon.assert.calledOnce(mock);
        /* sinon.assert.calledOn(mock, sinon.match([{
           "key": "atestList2",
           "name": "atestList2",
           "latitude": 2,
           "longitude": 3,
           "shortName": "short",
           "isDepot": false,
           "isReliefPoint": false,
           "capacities": null,
           "informationPoint": null,
           "crewTravelTimes": null
       }, {
           "key": "btestList",
           "name": "btestList",
           "latitude": 2,
           "longitude": 3,
           "shortName": "short",
           "isDepot": false,
           "isReliefPoint": false,
           "capacities": null,
           "informationPoint": null,
           "crewTravelTimes": null
       }]));  */
        mock.restore();
    });
    
    it('filterByName: returns json with array of nodes by name', async function () {
        let body = {
            "key": "btestList",
            "name": "btestList",
            "latitude": 2,
            "longitude": 3,
            "shortName": "short",
            "isDepot": false,
            "isReliefPoint": false,
            "capacities": null,
            "informationPoint": null,
            "crewTravelTimes": null
        };

        let body2 = {
            "key": "atestList2",
            "name": "atestList2",
            "latitude": 2,
            "longitude": 3,
            "shortName": "short",
            "isDepot": false,
            "isReliefPoint": false,
            "capacities": null,
            "informationPoint": null,
            "crewTravelTimes": null
        };

        let req: Partial<Request> = {};
        let req2: Partial<Request> = {};
        let req3: Partial<Request> = {};
        req.body = body;
        req2.body = body2;
        let param = {
            "name": "b"
        };
        req3.params = param;

        let res: Partial<Response> = {};
        let res2: Partial<Response> = {};
        let res3: Partial<Response> = {
            json: sinon.spy()
        };
        let next: Partial<NextFunction> = () => { };


        let nodeServiceClass = require(config.services.node.path).default;
        let nodeServiceInstance = Container.get(nodeServiceClass)
        Container.set(config.services.node.name, nodeServiceInstance);

        nodeServiceInstance = Container.get(config.services.node.name);
        const mock = sinon.stub(nodeServiceInstance, "filterByName").returns(Result.ok<INodeDTO[]>([{
            "key": req.body.key,
            "name": req.body.name,
            "latitude": req.body.latitude,
            "longitude": req.body.longitude,
            "shortName": req.body.shortName,
            "isDepot": req.body.isDepot,
            "isReliefPoint": req.body.isReliefPoint,
            "informationPoint": req.body.informationPoint,
            "capacities": req.body.capacities,
            "crewTravelTimes": req.body.crewTravelTimes
        }]));
        const ctrl = new NodeController(nodeServiceInstance as INodeService);
        await ctrl.createNode(<Request>req, <Response>res, <NextFunction>next);
        await ctrl.createNode(<Request>req2, <Response>res2, <NextFunction>next);
        await ctrl.filterByName(<Request>req3, <Response>res3, <NextFunction>next);
        sinon.assert.calledOnce(mock);
        sinon.assert.calledWith(mock, sinon.match("b"));
        mock.restore();
    });
    
    it('listByCode: returns json with array of nodes by name', async function () {

        let body = {
            "key": "btestList",
            "name": "btestList",
            "latitude": 2,
            "longitude": 3,
            "shortName": "short",
            "isDepot": false,
            "isReliefPoint": false,
            "capacities": null,
            "informationPoint": null,
            "crewTravelTimes": null
        };

        let body2 = {
            "key": "atestList2",
            "name": "atestList2",
            "latitude": 2,
            "longitude": 3,
            "shortName": "short",
            "isDepot": false,
            "isReliefPoint": false,
            "capacities": null,
            "informationPoint": null,
            "crewTravelTimes": null
        };

        let req: Partial<Request> = {};
        let req2: Partial<Request> = {};
        req.body = body;
        req2.body = body2;

        let res: Partial<Response> = {};
        let res2: Partial<Response> = {};
        let res3: Partial<Response> = {
            json: sinon.spy()
        };
        let next: Partial<NextFunction> = () => { };


        let nodeServiceClass = require(config.services.node.path).default;
        let nodeServiceInstance = Container.get(nodeServiceClass)
        Container.set(config.services.node.name, nodeServiceInstance);

        nodeServiceInstance = Container.get(config.services.node.name);
        const mock = sinon.stub(nodeServiceInstance, "listByCode").returns(Result.ok<INodeDTO[]>([{
            "key": req.body.key,
            "name": req.body.name,
            "latitude": req.body.latitude,
            "longitude": req.body.longitude,
            "shortName": req.body.shortName,
            "isDepot": req.body.isDepot,
            "isReliefPoint": req.body.isReliefPoint,
            "informationPoint": req.body.informationPoint,
            "capacities": req.body.capacities,
            "crewTravelTimes": req.body.crewTravelTimes
        },
        {
            "key": req2.body.key,
            "name": req2.body.name,
            "latitude": req2.body.latitude,
            "longitude": req2.body.longitude,
            "shortName": req2.body.shortName,
            "isDepot": req2.body.isDepot,
            "isReliefPoint": req2.body.isReliefPoint,
            "informationPoint": req2.body.informationPoint,
            "capacities": req2.body.capacities,
            "crewTravelTimes": req2.body.crewTravelTimes
        }]));

        const ctrl = new NodeController(nodeServiceInstance as INodeService);


        await ctrl.createNode(<Request>req, <Response>res, <NextFunction>next);
        await ctrl.createNode(<Request>req2, <Response>res2, <NextFunction>next);
        await ctrl.listByCode(<Response>res3, <NextFunction>next);

        sinon.assert.calledOnce(mock);
   
        mock.restore();
    });
   /*   
    it('filterByCode: returns json with array of nodes by code', async function () {
        let body = {
            "key": "btestList",
            "name": "btestList",
            "latitude": 2,
            "longitude": 3,
            "shortName": "short",
            "isDepot": false,
            "isReliefPoint": false,
            "capacities": null,
            "informationPoint": null,
            "crewTravelTimes": null
        };

        let body2 = {
            "key": "atestList2",
            "name": "atestList2",
            "latitude": 2,
            "longitude": 3,
            "shortName": "short",
            "isDepot": false,
            "isReliefPoint": false,
            "capacities": null,
            "informationPoint": null,
            "crewTravelTimes": null
        };

        let req: Partial<Request> = {};
        let req2: Partial<Request> = {};
        let req3: Partial<Request> = {};
        req.body = body;
        req2.body = body2;
        let param = {
            "key": "b"
        };
        req3.params = param;

        let res: Partial<Response> = {};
        let res2: Partial<Response> = {};
        let res3: Partial<Response> = {
            json: sinon.spy()
        };
        let next: Partial<NextFunction> = () => { };


        let nodeServiceClass = require(config.services.node.path).default;
        let nodeServiceInstance = Container.get(nodeServiceClass)
        Container.set(config.services.node.name, nodeServiceInstance);

        nodeServiceInstance = Container.get(config.services.node.name);
        const mock = sinon.stub(nodeServiceInstance, "filterByCode").returns(Result.ok<INodeDTO[]>([{
            "key": req.body.key,
            "name": req.body.name,
            "latitude": req.body.latitude,
            "longitude": req.body.longitude,
            "shortName": req.body.shortName,
            "isDepot": req.body.isDepot,
            "isReliefPoint": req.body.isReliefPoint,
            "informationPoint": req.body.informationPoint,
            "capacities": req.body.capacities,
            "crewTravelTimes": req.body.crewTravelTimes
        }]));
        const ctrl = new NodeController(nodeServiceInstance as INodeService);
        await ctrl.createNode(<Request>req, <Response>res, <NextFunction>next);
        await ctrl.createNode(<Request>req2, <Response>res2, <NextFunction>next);
        await ctrl.filterByCode(<Request>req3, <Response>res3, <NextFunction>next);
        sinon.assert.calledOnce(mock);
        sinon.assert.calledWith(mock, sinon.match("b"));
        mock.restore();
    });  */
});