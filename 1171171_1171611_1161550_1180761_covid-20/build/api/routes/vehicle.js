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
    app.use('/vehicle', route);
    const ctrl = typedi_1.Container.get(config_1.default.controller.vehicle.name);
    route.post('/post', 
    /* celebrate({
       body: Joi.object({
         name: Joi.string().required()
       })
     }),*/
    (req, res, next) => ctrl.createVehicle(req, res, next));
};
//# sourceMappingURL=vehicle.js.map