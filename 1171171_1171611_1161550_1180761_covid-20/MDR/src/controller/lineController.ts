import config from '../config';
import ILineController from './IController/ILineController';
import ILineDTO from '../dto/Line/lineDTO';
import ILineService from '../services/IServices/ILineService';
import { Inject } from 'typedi';
import { NextFunction, Request, Response } from 'express';
import { Result } from '../core/logic/Result';
import { Line } from '../models/line';



export default class LineController implements ILineController {
  constructor(@Inject(config.services.line.name) private lineServiceInstance: ILineService) {}

  public async createLine(req: Request, res: Response, next: NextFunction) {
    try {
      const lineOrError = (await this.lineServiceInstance.createLine(req.body as ILineDTO)) as Result<Line>;
      if (lineOrError.isFailure) {
        return res.status(700).send();
      }
      const lineDTO = lineOrError.getValue();
      return res.status(201).json(lineDTO);
    } catch (e) {
      return next(e);
    }
  }

  public async listByName(res: Response, next: NextFunction) {
    try {
      await this.lineServiceInstance
        .listByName()
        .then(value => {
          res.status(200).send(value);
        })
        .catch(value => {
          res.status(400).send(value);
        });
    } catch (e) {
      return next(e);
    }
  }
  public async listByCode(res: Response, next: NextFunction) {
    try {
      await this.lineServiceInstance
        .listByCode()
        .then(value => {
          res.status(200).send(value);
        })
        .catch(value => {
          res.status(400).send(value);
        });
    } catch (e) {
      return next(e);
    }
  }

  public async filterByName(req: Request, res: Response, next: NextFunction) {
    try {
      const key = req.params.name;
      await this.lineServiceInstance.filterByName(key).then(value => {
          res.status(200).send(value);
        }).catch(value => {
          res.status(400).send(value);
        });
    } catch (e) {
      return next(e);
    }
  }
  public async filterByCode(req: Request, res: Response, next: NextFunction) {
    try {
      const key = req.params.key;
      await this.lineServiceInstance.filterCode(key).then(value => {
          res.status(200).send(value);
        }).catch(value => {
          res.status(400).send(value);
        });
    } catch (e) {
      return next(e);
    }
  }
}
