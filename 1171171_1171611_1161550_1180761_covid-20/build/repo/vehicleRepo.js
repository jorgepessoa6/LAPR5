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
const mongoose_1 = require("mongoose");
const vehicleID_1 = require("../models/vehicleID");
let VehicleRepo = class VehicleRepo {
    constructor(vehicleSchema) {
        this.vehicleSchema = vehicleSchema;
    }
    createBaseQuery() {
        return {
            where: {},
        };
    }
    async exists(vehicleID) {
        const idX = vehicleID instanceof vehicleID_1.VehicleID ? vehicleID.id.toValue() : vehicleID;
        const query = { domainId: idX };
        const vehicleDocument = await this.vehicleSchema.findOne(query);
        return !!vehicleDocument === true;
    }
    async save(vehicle) {
        const query = { domainId: vehicle.id.toString() };
        const vehicleDocument = await this.vehicleSchema.findOne(query);
        try {
            if (vehicleDocument === null) {
                const rawVehicle = vehicleMapper_1.default.toPersistence(vehicle);
                const vehicleCreated = await this.vehicleSchema.create(rawVehicle);
                return vehicleMapper_1.default.toDomain(vehicleCreated);
            }
            else {
                vehicleDocument.name = vehicle.name;
                await vehicleDocument.save();
                return vehicle;
            }
        }
        catch (err) {
            throw err;
        }
    }
    async findByDomainId(vehicleID) {
        const query = { domainId: vehicleID };
        const vehicleRecord = await this.vehicleSchema.findOne(query);
        if (vehicleRecord != null) {
            return vehicleMapper_1.default.toDomain(vehicleRecord);
        }
        else
            return null;
    }
};
VehicleRepo = __decorate([
    typedi_1.Service(),
    __param(0, typedi_1.Inject('Vehicle')),
    __metadata("design:paramtypes", [mongoose_1.Model])
], VehicleRepo);
exports.default = VehicleRepo;
//# sourceMappingURL=vehicleRepo.js.map