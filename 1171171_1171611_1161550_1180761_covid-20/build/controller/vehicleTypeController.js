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
const config_1 = __importDefault(require("../config"));
let VehicleTypeController = class VehicleTypeController {
    constructor(vehicleTypeServiceInstance) {
        this.vehicleTypeServiceInstance = vehicleTypeServiceInstance;
    }
    async createVehicleType(req, res, next) {
        try {
            const vehicleTypeOrError = await this.vehicleTypeServiceInstance.createVehicleType(req.body);
            if (vehicleTypeOrError.isFailure) {
                return res.status(402).send();
            }
            const vehicleTypeDTO = vehicleTypeOrError.getValue();
            return res.status(201).json(vehicleTypeDTO);
        }
        catch (e) {
            return next(e);
        }
    }
};
VehicleTypeController = __decorate([
    __param(0, typedi_1.Inject(config_1.default.services.vehicleType.name)),
    __metadata("design:paramtypes", [Object])
], VehicleTypeController);
exports.default = VehicleTypeController;
//# sourceMappingURL=vehicleTypeController.js.map