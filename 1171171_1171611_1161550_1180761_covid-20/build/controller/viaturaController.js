"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const typedi_1 = require("typedi");
const celebrate_1 = require("celebrate");
const config_1 = __importDefault(require("../config"));
const viaturaService_1 = __importDefault(require("../services/viaturaService"));
let ViaturaController = class ViaturaController {
    constructor(viaturaServiceInstance) {
        this.viaturaServiceInstance = viaturaServiceInstance;
    }
    async createViatura(req, res) {
        celebrate_1.celebrate({
            body: celebrate_1.Joi.object({ name: celebrate_1.Joi.string().required() })
        }),
            async (req, res, next) => {
                try {
                    const viaturaOrError = await this.viaturaServiceInstance.createViatura(req.body);
                    if (viaturaOrError.isFailure) {
                        return res.status(402).send();
                    }
                    const viaturaDTO = viaturaOrError.getValue();
                    return res.status(201).json(viaturaDTO);
                }
                catch (e) {
                    res.status(500).send(e);
                }
            };
    }
};
ViaturaController = __decorate([
    __param(0, typedi_1.Inject(config_1.default.services.viatura.name)),
    __metadata("design:paramtypes", [viaturaService_1.default])
], ViaturaController);
exports.default = ViaturaController;
//# sourceMappingURL=viaturaController.js.map