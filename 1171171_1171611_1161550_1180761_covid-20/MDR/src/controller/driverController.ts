import {Router,Request,Response,NextFunction} from 'express';
import {Container, Inject, Service} from 'typedi';
import {celebrate, Joi} from 'celebrate';
import IDriverDTO from "../dto/Driver/driverDTO";
import { Result } from '../core/logic/Result';
import config from '../config';
import DriverService from '../services/driverService';
import IDriverService from '../services/IServices/IDriverService';
import IDriverController from './IController/IDriverController';

export default class DriverController implements IDriverController {
    constructor(
        @Inject(config.services.driver.name) private driverServiceInstance: IDriverService
    ) { }

    public async createDriver(req: Request, res: Response, next: NextFunction) {
        try {
             const driverOrError = await this.driverServiceInstance.createDriver(
                            req.body as IDriverDTO) as Result<IDriverDTO>;
                    if(driverOrError.isFailure){
                        return res.status(402).send();
                    }
                    const driverDTO = driverOrError.getValue();
                    return res.status(201).json(driverDTO);
                    
                } catch (e) {
                    return next(e);
                }
            }

            public async listByName(res: Response, next: NextFunction) {
                try {
                    await this.driverServiceInstance.listByName().then(value=>{
                        res.status(200).send(value);
                    }).catch(value => {
                        res.status(400).send(value);
                    });
                } catch (e) {
                    return next(e);
                }
            }
    }
