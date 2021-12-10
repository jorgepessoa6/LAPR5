import config from '../../config';
import ILineController from '../../controller/IController/ILineController';
import { Container } from 'typedi';
import { Router } from 'express';

const route = Router();

export default (app: Router) => {
  app.use('/line', route);

  const ctrl = Container.get(config.controller.line.name) as ILineController;

  route.post(
    '/post',
    /* celebrate({
        body: Joi.object({
          name: Joi.string().required()
        })
      }), */
    (req, res, next) => ctrl.createLine(req, res, next),
  );

  route.get('/listarNome', (req, res, next) => ctrl.listByName(res, next));
  route.get('/listarCodigo', (req, res, next) => ctrl.listByCode(res, next));
  route.get('/filtrarNome/:name', (req, res, next) => ctrl.filterByName(req, res, next));
  route.get('/filtrarKey/:key', (req, res, next) => ctrl.filterByCode(req, res, next));

  /*     route.put('',
      celebrate({
        body: Joi.object({
          id: Joi.string().required(),
          name: Joi.string().required()
        }),
      }),
      (req, res, next) => ctrl.updateRole(req, res, next) ); */
};
