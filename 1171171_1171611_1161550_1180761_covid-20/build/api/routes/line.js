"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = __importDefault(require("../../config"));
const typedi_1 = require("typedi");
const express_1 = require("express");
const route = express_1.Router();
exports.default = (app) => {
    app.use('/line', route);
    const ctrl = typedi_1.Container.get(config_1.default.controller.line.name);
    route.post('/post', 
    /* celebrate({
        body: Joi.object({
          name: Joi.string().required()
        })
      }), */
    (req, res, next) => ctrl.createLine(req, res, next));
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
//# sourceMappingURL=line.js.map