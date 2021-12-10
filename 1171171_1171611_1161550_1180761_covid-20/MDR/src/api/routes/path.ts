import { Router, Request, Response, application } from 'express';
import { Container } from 'typedi';
import config from '../../config';
import { celebrate, Joi } from 'celebrate';
import IPathController from '../../controller/IController/IPathController';

const route = Router();

export default (app: Router) => {
  app.use('/path', route);

  const ctrl = Container.get(config.controller.path.name) as IPathController;

  route.post(
    '/post',
    /* celebrate({
        body: Joi.object({
          name: Joi.string().required()
        })
      }), */
    (req, res, next) => {
      ctrl.createPath(req, res, next);
    },
  );

  route.get(
    '/listarPercursosLinha/:key',

    (req, res, next) => ctrl.listPathsByLine(req, res, next),
  );

  route.get(
    '/listarLinePathsByLine/:key',

    (req, res, next) => ctrl.listLinePathsByLine(req, res, next),
  );

  route.get(
    '/listarTodosPercursos',

    (req, res, next) => ctrl.listAllPaths(res, next),
  );

  /*     route.put('',
      celebrate({
        body: Joi.object({
          id: Joi.string().required(),
          name: Joi.string().required()
        }),
      }),
      (req, res, next) => ctrl.updateRole(req, res, next) ); */
};
