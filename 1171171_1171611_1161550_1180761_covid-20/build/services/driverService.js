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
const driverMapper_1 = __importDefault(require("../mappers/driverMapper"));
const Result_1 = require("../core/logic/Result");
const driver_1 = require("../models/driver");
const config_1 = __importDefault(require("../config"));
let DriverService = class DriverService {
    constructor(driverRepo) {
        this.driverRepo = driverRepo;
    }
    async createDriver(driverDTO) {
        try {
            const driverOrError = await driver_1.Driver.create(driverDTO);
            if (driverOrError.isFailure) {
                return Result_1.Result.fail(driverOrError.errorValue());
            }
            const driverResult = driverOrError.getValue();
            await this.driverRepo.save(driverResult);
            const driverDTOResult = driverMapper_1.default.toDTO(driverResult);
            //RETURN
            return Result_1.Result.ok(driverDTOResult);
        }
        catch (e) {
            throw e;
        }
    }
};
DriverService = __decorate([
    typedi_1.Service(),
    __param(0, typedi_1.Inject(config_1.default.repos.driver.name)),
    __metadata("design:paramtypes", [Object])
], DriverService);
exports.default = DriverService;
//# sourceMappingURL=driverService.js.map