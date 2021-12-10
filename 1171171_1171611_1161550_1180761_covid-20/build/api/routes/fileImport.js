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
    app.use('/fileImport', route);
    //CRIar interfaces e aplicar
    const ctrl = typedi_1.Container.get(config_1.default.controller.fileImport.name);
    route.post('/upload', (req, res, next) => ctrl.importFile(req, res, next));
};
//# sourceMappingURL=fileImport.js.map