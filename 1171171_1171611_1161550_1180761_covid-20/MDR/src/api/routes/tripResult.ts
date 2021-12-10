import { Router, Request, Response, application } from 'express';
import { Container } from 'typedi';
import config from '../../config';
import { celebrate, Joi } from 'celebrate';
import ITripResultController from '../../controller/IController/ITripResultController';

const route = Router();

export default (app: Router) => {
  app.use('/results', route);

  const ctrl = Container.get(config.controller.tripResult.name) as ITripResultController;

  route.post(
    '/post',
    /* celebrate({
        body: Joi.object({
          name: Joi.string().required()
        })
      }), */
    (req, res, next) => {
      ctrl.createResult(req, res, next);
    },
  );

  route.get('/listarTripResults',
  (req, res, next) => ctrl.listarTripResults(res, next));
}