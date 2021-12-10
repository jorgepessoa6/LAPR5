import {Router, Request, Response, application} from 'express';
import { Container } from 'typedi';
import config from "../../config";
import { celebrate, Joi } from 'celebrate';
import IDriverController from '../../controller/IController/IDriverController';


const route = Router();

export default(app:Router)=> {
    app.use('/driver',route);


    const ctrl = Container.get(config.controller.driver.name) as IDriverController;

    route.get('/listarNome',
    (req, res, next) => ctrl.listByName(res, next));
    route.post('/post',
      /*celebrate({
        body: Joi.object({
          name: Joi.string().required()
        })
      }),*/
      (req, res, next) => ctrl.createDriver(req, res, next) );
  

}