import {Router,Request,Response,NextFunction} from 'express';
import {Container, Inject, Service} from 'typedi';
import {celebrate, Joi} from 'celebrate';
import IVehicleTypeDTO from "../dto/VehicleType/vehicleTypeDTO";
import { Result } from '../core/logic/Result';
import config from '../config';
import IVehicleTypeService from '../services/IServices/IVehicleTypeService';
import IVehicleTypeController from './IController/IVehicleTypeController';

export default class VehicleTypeController implements IVehicleTypeController {
    constructor(
        @Inject(config.services.vehicleType.name) private vehicleTypeServiceInstance: IVehicleTypeService
    ) { }

    public async createVehicleType(req: Request, res: Response, next: NextFunction) {
        try {
             const vehicleTypeOrError = await this.vehicleTypeServiceInstance.createVehicleType(
                            req.body as IVehicleTypeDTO) as Result<IVehicleTypeDTO>;
                    if(vehicleTypeOrError.isFailure){
                        return res.status(402).send();
                    }
                    const vehicleTypeDTO = vehicleTypeOrError.getValue();
                    return res.status(201).json(vehicleTypeDTO);
                    
                } catch (e) {
                    return next(e);
                }
            }

            public async listByName(res: Response, next: NextFunction) {
                try {
                    await this.vehicleTypeServiceInstance.listByName().then(value=>{
                        res.status(200).send(value);
                    }).catch(value => {
                        res.status(400).send(value);
                    });
                } catch (e) {
                    return next(e);
                }
            }

    }
