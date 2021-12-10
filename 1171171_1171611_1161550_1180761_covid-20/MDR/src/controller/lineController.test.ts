import * as sinon from 'sinon';
import config from '../config';
import ILineService from '../services/IServices/ILineService';
import LineController from './lineController';
import { Container } from 'typedi';
import { Driver } from '../models/driver';
import { LinePath } from '../models/linePath';
import { NextFunction, Request, Response } from 'express';
import { Result } from '../core/logic/Result';
import { VehicleType } from '../models/vehicleType';
import ILineDTO from '../dto/Line/lineDTO';

describe('line controller', function () {
  it('createLine: returns json with key+name+color values', async function () {
    let body = {
      key: 'test',
      name: 'test',
      firstNode: 'test',
      lastNode: 'test',
      color: 'RGB(1,1,1)',
      linePaths: null,
      allowedDrivers: null,
      disallowedDrivers: null,
      allowedVehicles: null,
      disallowedVehicles: null,
    };
    let req: Partial<Request> = {};
    req.body = body;

    let res: Partial<Response> = {
      json: sinon.spy(),
    };
    let next: Partial<NextFunction> = () => {};

    let lineServiceClass = require(config.services.line.path).default;
    let lineServiceInstance = Container.get(lineServiceClass);
    Container.set(config.services.line.name, lineServiceInstance);

    lineServiceInstance = Container.get(config.services.line.name);
    const mock = sinon.stub(lineServiceInstance, 'createLine').returns(
      Result.ok<ILineDTO>({
        key: req.body.key,
        name: req.body.name,
        firstNode: req.body.firstNode,
        lastNode: req.body.lastNode,
        color: req.body.color,
        linePaths: null,
        allowedDrivers: null,
        disallowedDrivers: null,
        allowedVehicles: null,
        disallowedVehicles: null,
      }),
    );

    const ctrl = new LineController(lineServiceInstance as ILineService);

    await ctrl.createLine(<Request>req, <Response>res, <NextFunction>next);

    sinon.assert.calledOnce(mock);
    sinon.assert.calledWith(
      mock,
      sinon.match({
        key: req.body.key,
        name: req.body.name,
        firstNode: req.body.firstNode,
        lastNode: req.body.lastNode,
        color: req.body.color,
        linePaths: null,
        allowedDrivers: null,
        disallowedDrivers: null,
        allowedVehicles: null,
        disallowedVehicles: null,
      }),
    );
    mock.restore();
  });

  it('listByName: returns json with array of lines by name', async function () {
    let body = {
      key: 'b1',
      name: 'b1',
      color: 'cor bonita',
      linePaths: null,
      allowedDrivers: null,
      disallowedDrivers: null,
      allowedVehicles: null,
      disallowedVehicles: null,
    };

    let body2 = {
      key: 'atestList2',
      name: 'atestList2',
      color: 'cor bonita2',
      linePaths: null,
      allowedDrivers: null,
      disallowedDrivers: null,
      allowedVehicles: null,
      disallowedVehicles: null,
    };

    let req: Partial<Request> = {};
    let req2: Partial<Request> = {};
    req.body = body;
    req2.body = body2;

    let res: Partial<Response> = {};
    let res2: Partial<Response> = {};
    let res3: Partial<Response> = {
      json: sinon.spy(),
    };
    let next: Partial<NextFunction> = () => {};

    let lineServiceClass = require(config.services.line.path).default;
    let lineServiceInstance = Container.get(lineServiceClass);
    Container.set(config.services.line.name, lineServiceInstance);

    lineServiceInstance = Container.get(config.services.line.name);
    const mock = sinon.stub(lineServiceInstance, 'listByName').returns(
      Result.ok<ILineDTO[]>([
        {
          key: req.body.key,
          name: req.body.name,
          firstNode: req.body.firstNode,
          lastNode: req.body.lastNode,
          color: req.body.color,
          linePaths: req.body.linePaths,
          allowedDrivers: req.body.allowedDrivers,
          disallowedDrivers: req.body.disallowedDrivers,
          allowedVehicles: req.body.allowedVehicles,
          disallowedVehicles: req.body.disallowedVehicles,
        },
        {
          key: req2.body.key,
          name: req2.body.name,
          firstNode: req.body.firstNode,
          lastNode: req.body.lastNode,
          color: req2.body.color,
          linePaths: req2.body.linePaths,
          allowedDrivers: req2.body.allowedDrivers,
          disallowedDrivers: req2.body.disallowedDrivers,
          allowedVehicles: req2.body.allowedVehicles,
          disallowedVehicles: req2.body.disallowedVehicles,
        },
      ]),
    );

    const ctrl = new LineController(lineServiceInstance as ILineService);

    await ctrl.createLine(<Request>req, <Response>res, <NextFunction>next);
    await ctrl.createLine(<Request>req2, <Response>res2, <NextFunction>next);
    await ctrl.listByName(<Response>res3, <NextFunction>next);

    sinon.assert.calledOnce(mock);
    mock.restore();
  });

  it('listByCode: returns json with array of lines by name', async function () {
    let body = {
      key: 'b1',
      name: 'b1',
      color: 'cor bonita',
      linePaths: null,
      allowedDrivers: null,
      disallowedDrivers: null,
      allowedVehicles: null,
      disallowedVehicles: null,
    };

    let body2 = {
      key: 'atestList2',
      name: 'atestList2',
      color: 'cor bonita2',
      linePaths: null,
      allowedDrivers: null,
      disallowedDrivers: null,
      allowedVehicles: null,
      disallowedVehicles: null,
    };

    let req: Partial<Request> = {};
    let req2: Partial<Request> = {};
    req.body = body;
    req2.body = body2;

    let res: Partial<Response> = {};
    let res2: Partial<Response> = {};
    let res3: Partial<Response> = {
      json: sinon.spy(),
    };
    let next: Partial<NextFunction> = () => {};

    let lineServiceClass = require(config.services.line.path).default;
    let lineServiceInstance = Container.get(lineServiceClass);
    Container.set(config.services.line.name, lineServiceInstance);

    lineServiceInstance = Container.get(config.services.line.name);
    const mock = sinon.stub(lineServiceInstance, 'listByCode').returns(
      Result.ok<ILineDTO[]>([
        {
          key: req.body.key,
          name: req.body.name,
          firstNode: req.body.firstNode,
          lastNode: req.body.lastNode,
          color: req.body.color,
          linePaths: req.body.linePaths,
          allowedDrivers: req.body.allowedDrivers,
          disallowedDrivers: req.body.disallowedDrivers,
          allowedVehicles: req.body.allowedVehicles,
          disallowedVehicles: req.body.disallowedVehicles,
        },
        {
          key: req2.body.key,
          name: req2.body.name,
          firstNode: req2.body.firstNode,
          lastNode: req2.body.lastNode,
          color: req2.body.color,
          linePaths: req2.body.linePaths,
          allowedDrivers: req2.body.allowedDrivers,
          disallowedDrivers: req2.body.disallowedDrivers,
          allowedVehicles: req2.body.allowedVehicles,
          disallowedVehicles: req2.body.disallowedVehicles,
        },
      ]),
    );

    const ctrl = new LineController(lineServiceInstance as ILineService);

    await ctrl.createLine(<Request>req, <Response>res, <NextFunction>next);
    await ctrl.createLine(<Request>req2, <Response>res2, <NextFunction>next);
    await ctrl.listByCode(<Response>res3, <NextFunction>next);

    sinon.assert.calledOnce(mock);

    mock.restore();
  });

  it('filterByName: returns json with array of lines by name', async function () {
    let body = {
      key: '1',
      name: 'b',
      color: 'cor bonita',
      linePaths: null,
      allowedDrivers: null,
      disallowedDrivers: null,
      allowedVehicles: null,
      disallowedVehicles: null,
    };

    let body2 = {
      key: 'atestList2',
      name: 'atestList2',
      color: 'cor bonita2',
      linePaths: null,
      allowedDrivers: null,
      disallowedDrivers: null,
      allowedVehicles: null,
      disallowedVehicles: null,
    };

    let req: Partial<Request> = {};
    let req2: Partial<Request> = {};
    let req3: Partial<Request> = {};
    req.body = body;
    req2.body = body2;
    let param = {
      name: 'b',
    };
    req3.params = param;

    let res: Partial<Response> = {};
    let res2: Partial<Response> = {};
    let res3: Partial<Response> = {
      json: sinon.spy(),
    };
    let next: Partial<NextFunction> = () => {};

    let lineServiceClass = require(config.services.line.path).default;
    let lineServiceInstance = Container.get(lineServiceClass);
    Container.set(config.services.line.name, lineServiceInstance);

    lineServiceInstance = Container.get(config.services.line.name);
    const mock = sinon.stub(lineServiceInstance, 'filterByName').returns(
      Result.ok<ILineDTO[]>([
        {
          key: req.body.key,
          name: req.body.name,
          firstNode: req.body.firstNode,
          lastNode: req.body.lastNode,
          color: req.body.color,
          linePaths: req.body.linePaths,
          allowedDrivers: req.body.allowedDrivers,
          disallowedDrivers: req.body.disallowedDrivers,
          allowedVehicles: req.body.allowedVehicles,
          disallowedVehicles: req.body.disallowedVehicles,
        },
      ]),
    );
    const ctrl = new LineController(lineServiceInstance as ILineService);
    await ctrl.createLine(<Request>req, <Response>res, <NextFunction>next);
    await ctrl.createLine(<Request>req2, <Response>res2, <NextFunction>next);
    await ctrl.filterByName(<Request>req3, <Response>res3, <NextFunction>next);
    sinon.assert.calledOnce(mock);
    sinon.assert.calledWith(mock, sinon.match('b'));
    mock.restore();
  });

  it('filterByCode: returns json with array of lines by code', async function () {
    let body = {
      key: '1',
      name: 'b',
      color: 'cor bonita',
      linePaths: null,
      allowedDrivers: null,
      disallowedDrivers: null,
      allowedVehicles: null,
      disallowedVehicles: null,
    };

    let body2 = {
      key: 'atestList2',
      name: 'atestList2',
      color: 'cor bonita2',
      linePaths: null,
      allowedDrivers: null,
      disallowedDrivers: null,
      allowedVehicles: null,
      disallowedVehicles: null,
    };

    let req: Partial<Request> = {};
    let req2: Partial<Request> = {};
    let req3: Partial<Request> = {};
    req.body = body;
    req2.body = body2;
    let param = {
      key: '1',
    };
    req3.params = param;

    let res: Partial<Response> = {};
    let res2: Partial<Response> = {};
    let res3: Partial<Response> = {
      json: sinon.spy(),
    };
    let next: Partial<NextFunction> = () => {};

    let lineServiceClass = require(config.services.line.path).default;
    let lineServiceInstance = Container.get(lineServiceClass);
    Container.set(config.services.line.name, lineServiceInstance);

    lineServiceInstance = Container.get(config.services.line.name);
    const mock = sinon.stub(lineServiceInstance, 'filterCode').returns(
      Result.ok<ILineDTO[]>([
        {
          key: req.body.key,
          name: req.body.name,
          firstNode: req.body.firstNode,
          lastNode: req.body.lastNode,
          color: req.body.color,
          linePaths: req.body.linePaths,
          allowedDrivers: req.body.allowedDrivers,
          disallowedDrivers: req.body.disallowedDrivers,
          allowedVehicles: req.body.allowedVehicles,
          disallowedVehicles: req.body.disallowedVehicles,
        },
      ]),
    );
    const ctrl = new LineController(lineServiceInstance as ILineService);
    await ctrl.createLine(<Request>req, <Response>res, <NextFunction>next);
    await ctrl.createLine(<Request>req2, <Response>res2, <NextFunction>next);
    await ctrl.filterByCode(<Request>req3, <Response>res3, <NextFunction>next);
    sinon.assert.calledOnce(mock);
    sinon.assert.calledWith(mock, sinon.match('1'));
    mock.restore();
  });
});
