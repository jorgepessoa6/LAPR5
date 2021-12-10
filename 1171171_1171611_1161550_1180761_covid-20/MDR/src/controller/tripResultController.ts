import {Router,Request,Response,NextFunction} from 'express';
import {Container, Inject, Service} from 'typedi';
import { Result } from '../core/logic/Result';
import config from '../config';
import IResultController from './IController/ITripResultController';
import IResultDTO from '../dto/TripResult/tripResultDTO';
import ITripResultService from '../services/IServices/ITripResultService';


export default class TripResultController implements IResultController {
    constructor(
        @Inject(config.services.tripResult.name) private tripResultServiceInstance: ITripResultService,
    ) { }
    public async createResult(req: Request, res: Response, next: NextFunction) {
        try {
            const resultOrError = await this.tripResultServiceInstance.createResult(req.body as IResultDTO) as Result<IResultDTO>;
              
            if (resultOrError.isFailure) {
              return res.status(402).send();
            }
      
            const resultDTO = resultOrError.getValue();
            return res.json( resultDTO ).status(201);
          }
          catch (e) {
            return next(e);
          }
    }

    public async listarTripResults(res: Response<any>, next: NextFunction) {
      try {
        await this.tripResultServiceInstance.listarTripResults().then(value=>{
            res.status(200).send(value);
        }).catch(value => {
            res.status(400).send(value);
        });
    } catch (e) {
        return next(e);
    }
    }
  }