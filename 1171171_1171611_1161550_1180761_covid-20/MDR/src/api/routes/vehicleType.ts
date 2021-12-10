import {Router, Request, Response, application} from 'express';
import { Container } from 'typedi';
import config from "../../config";
import { celebrate, Joi } from 'celebrate';
import IVehicleTypeController from '../../controller/IController/IVehicleTypeController';


const route = Router();

export default(app:Router)=> {
    app.use('/vehicleType',route);


    const ctrl = Container.get(config.controller.vehicleType.name) as IVehicleTypeController;

    route.get('/listarNome',
    (req, res, next) => ctrl.listByName(res, next));
    route.post('/post',
     /* celebrate({
        body: Joi.object({
          name: Joi.string().required()
        })
      }),*/
      (req, res, next) => ctrl.createVehicleType(req, res, next) );
  

}