import { Router, Request, Response, application } from 'express';
import { Container } from 'typedi';
import config from "../../config";
import { celebrate, Joi } from 'celebrate';
import INodeController from '../../controller/IController/INodeController';
import FileImportController from '../../controller/fileImportController';


const route = Router();

export default (app: Router) => {
  app.use('/fileImport', route);

    //CRIar interfaces e aplicar
  const ctrl = Container.get(config.controller.fileImport.name) as FileImportController;

  route.post('/upload',
    (req, res, next) => ctrl.importFile(req,res, next));
}