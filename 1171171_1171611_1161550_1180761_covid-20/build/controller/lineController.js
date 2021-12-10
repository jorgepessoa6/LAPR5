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
const config_1 = __importDefault(require("../config"));
const typedi_1 = require("typedi");
let LineController = class LineController {
    constructor(lineServiceInstance) {
        this.lineServiceInstance = lineServiceInstance;
    }
    async createLine(req, res, next) {
        try {
            const lineOrError = (await this.lineServiceInstance.createLine(req.body));
            if (lineOrError.isFailure) {
                return res.status(700).send();
            }
            const lineDTO = lineOrError.getValue();
            return res.status(201).json(lineDTO);
        }
        catch (e) {
            return next(e);
        }
    }
    async listByName(res, next) {
        try {
            await this.lineServiceInstance
                .listByName()
                .then(value => {
                res.status(200).send(value);
            })
                .catch(value => {
                res.status(400).send(value);
            });
        }
        catch (e) {
            return next(e);
        }
    }
    async listByCode(res, next) {
        try {
            await this.lineServiceInstance
                .listByCode()
                .then(value => {
                res.status(200).send(value);
            })
                .catch(value => {
                res.status(400).send(value);
            });
        }
        catch (e) {
            return next(e);
        }
    }
    async filterByName(req, res, next) {
        try {
            const key = req.params.name;
            await this.lineServiceInstance.filterByName(key).then(value => {
                res.status(200).send(value);
            }).catch(value => {
                res.status(400).send(value);
            });
        }
        catch (e) {
            return next(e);
        }
    }
    async filterByCode(req, res, next) {
        try {
            const key = req.params.key;
            await this.lineServiceInstance.filterCode(key).then(value => {
                res.status(200).send(value);
            }).catch(value => {
                res.status(400).send(value);
            });
        }
        catch (e) {
            return next(e);
        }
    }
};
LineController = __decorate([
    __param(0, typedi_1.Inject(config_1.default.services.line.name)),
    __metadata("design:paramtypes", [Object])
], LineController);
exports.default = LineController;
//# sourceMappingURL=lineController.js.map