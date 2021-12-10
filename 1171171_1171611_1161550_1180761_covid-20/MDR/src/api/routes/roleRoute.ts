import { Router } from 'express';
import { celebrate, Joi } from 'celebrate';

import { Container } from 'typedi';
import config from '../../config';
import IRoleController from '../../controller/IController/IRoleController';


const route = Router();

export default (app: Router) => {
  app.use('/roles', route);

  const ctrl = Container.get(config.controller.role.name) as IRoleController;

  route.post('',
    celebrate({
      body: Joi.object({
        name: Joi.string().required()
      })
    }),
    (req, res, next) => ctrl.createRole(req, res, next) );

  route.put('',
    celebrate({
      body: Joi.object({
        id: Joi.string().required(),
        name: Joi.string().required()
      }),
    }),
    (req, res, next) => ctrl.updateRole(req, res, next) );
};