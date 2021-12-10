import {Router,Request,Response,NextFunction} from 'express';
import {Container, Inject, Service} from 'typedi';
import  IPathDTO from '../dto/Path/pathDTO';
import  ILineDTO from '../dto/Line/lineDTO';
import { Result } from '../core/logic/Result';
import config from '../config';
import IPathService from '../services/IServices/IPathService';
import IPathController from './IController/IPathController';


export default class PathController implements IPathController {
    constructor(
        @Inject(config.services.path.name) private pathServiceInstance: IPathService,
    ) { }

    public async createPath(req: Request, res: Response, next: NextFunction) {
        try {
            const pathOrError = await this.pathServiceInstance.createPath(req.body as IPathDTO) as Result<IPathDTO>;
              
            if (pathOrError.isFailure) {
              return res.status(402).send();
            }
      
            const pathDTO = pathOrError.getValue();
            return res.json( pathDTO ).status(201);
          }
          catch (e) {
            return next(e);
          }
    }

    public async listPathsByLine(req: Request, res: Response, next: NextFunction) {
      try {
          const key= req.params.key;
          await this.pathServiceInstance.listPathsByLine(key).then(value=>{
              res.status(200).send(value);
          }).catch(value => {
              res.status(400).send(value);
          });
      } catch (e) {
          return next(e);
      }
  }

  public async listLinePathsByLine(req: Request, res: Response, next: NextFunction) {
    try {
        const key= req.params.key;
        await this.pathServiceInstance.listLinePathsByLine(key).then(value=>{
            res.status(200).send(value);
        }).catch(value => {
            res.status(400).send(value);
        });
    } catch (e) {
        return next(e);
    }
}

  public async listAllPaths(res: Response, next: NextFunction) {
    try {
        await this.pathServiceInstance.listByName().then(value=>{
            res.status(200).send(value);
        }).catch(value => {
            res.status(400).send(value);
        });
    } catch (e) {
        return next(e);
    }
}
}