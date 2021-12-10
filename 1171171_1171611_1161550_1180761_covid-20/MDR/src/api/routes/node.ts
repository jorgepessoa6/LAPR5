import { Router, Request, Response, application } from 'express';
import { Container } from 'typedi';
import config from "../../config";
import { celebrate, Joi } from 'celebrate';
import INodeController from '../../controller/IController/INodeController';


const route = Router();

export default (app: Router) => {
  app.use('/node', route);


  const ctrl = Container.get(config.controller.node.name) as INodeController;


  route.get('/listarNome',
    (req, res, next) => ctrl.listByName(res, next));
  route.get('/listarCodigo',
    (req, res, next) => ctrl.listByCode(res, next));
  route.get("/filtrarNome/:name",
    (req, res, next) => ctrl.filterByName(req, res, next));
  route.get("/filtrarKey/:key",
    (req, res, next) => ctrl.filterByCode(req, res, next));

  route.post('/post',
    /* celebrate({
      body: Joi.object({
        name: Joi.string().required()
      })
    }), */
    (req, res, next) => ctrl.createNode(req, res, next));

  /*     route.put('',
        celebrate({
          body: Joi.object({
            id: Joi.string().required(),
            name: Joi.string().required()
          }),
        }),
        (req, res, next) => ctrl.updateRole(req, res, next) ); */
}