"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const typedi_1 = require("typedi");
const config_1 = __importDefault(require("../../config"));
const route = express_1.Router();
exports.default = (app) => {
    app.use('/path', route);
    const ctrl = typedi_1.Container.get(config_1.default.controller.path.name);
    route.post('/post', 
    /* celebrate({
        body: Joi.object({
          name: Joi.string().required()
        })
      }), */
    (req, res, next) => {
        ctrl.createPath(req, res, next);
    });
    route.get('/listarPercursosLinha/:key', (req, res, next) => ctrl.listPathsByLine(req, res, next));
    route.get('/listarTodosPercursos', (req, res, next) => ctrl.listAllPaths(res, next));
    /*     route.put('',
        celebrate({
          body: Joi.object({
            id: Joi.string().required(),
            name: Joi.string().required()
          }),
        }),
        (req, res, next) => ctrl.updateRole(req, res, next) ); */
};
//# sourceMappingURL=path.js.map