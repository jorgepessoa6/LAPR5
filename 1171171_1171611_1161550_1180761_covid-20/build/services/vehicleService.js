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
const vehicleMapper_1 = __importDefault(require("../mappers/vehicleMapper"));
const Result_1 = require("../core/logic/Result");
const vehicle_1 = require("../models/vehicle");
const config_1 = __importDefault(require("../config"));
let VehicleService = class VehicleService {
    constructor(vehicleRepo) {
        this.vehicleRepo = vehicleRepo;
    }
    async createVehicle(vehicleDTO) {
        try {
            const vehicleOrError = await vehicle_1.Vehicle.create(vehicleDTO);
            if (vehicleOrError.isFailure) {
                return Result_1.Result.fail(vehicleOrError.errorValue());
            }
            const vehicleResult = vehicleOrError.getValue();
            await this.vehicleRepo.save(vehicleResult);
            const vehicleDTOResult = vehicleMapper_1.default.toDTO(vehicleResult);
            //RETURN
            return Result_1.Result.ok(vehicleDTOResult);
        }
        catch (e) {
            throw e;
        }
    }
};
VehicleService = __decorate([
    typedi_1.Service(),
    __param(0, typedi_1.Inject(config_1.default.repos.vehicle.name)),
    __metadata("design:paramtypes", [Object])
], VehicleService);
exports.default = VehicleService;
//# sourceMappingURL=vehicleService.js.map