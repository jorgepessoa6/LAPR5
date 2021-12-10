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
const vehicleTypeMapper_1 = __importDefault(require("../mappers/vehicleTypeMapper"));
const mongoose_1 = require("mongoose");
const vehicleTypeID_1 = require("../models/vehicleTypeID");
let VehicleTypeRepo = class VehicleTypeRepo {
    constructor(vehicleTypeSchema) {
        this.vehicleTypeSchema = vehicleTypeSchema;
    }
    createBaseQuery() {
        return {
            where: {},
        };
    }
    async exists(vehicleTypeID) {
        const idX = vehicleTypeID instanceof vehicleTypeID_1.VehicleTypeID ? vehicleTypeID.id.toValue() : vehicleTypeID;
        const query = { domainId: idX };
        const vehicleTypeDocument = await this.vehicleTypeSchema.findOne(query);
        return !!vehicleTypeDocument === true;
    }
    async save(vehicleType) {
        const query = { domainId: vehicleType.id.toString() };
        const vehicleTypeDocument = await this.vehicleTypeSchema.findOne(query);
        try {
            if (vehicleTypeDocument === null) {
                const rawVehicleType = vehicleTypeMapper_1.default.toPersistence(vehicleType);
                const vehicleTypeCreated = await this.vehicleTypeSchema.create(rawVehicleType);
                return vehicleTypeMapper_1.default.toDomain(vehicleTypeCreated);
            }
            else {
                vehicleTypeDocument.name = vehicleType.name;
                await vehicleTypeDocument.save();
                return vehicleType;
            }
        }
        catch (err) {
            throw err;
        }
    }
    async findByDomainId(vehicleTypeID) {
        const query = { domainId: vehicleTypeID };
        const vehicleTypeRecord = await this.vehicleTypeSchema.findOne(query);
        if (vehicleTypeRecord != null) {
            return vehicleTypeMapper_1.default.toDomain(vehicleTypeRecord);
        }
        else
            return null;
    }
};
VehicleTypeRepo = __decorate([
    typedi_1.Service(),
    __param(0, typedi_1.Inject('VehicleType')),
    __metadata("design:paramtypes", [mongoose_1.Model])
], VehicleTypeRepo);
exports.default = VehicleTypeRepo;
//# sourceMappingURL=vehicleTypeRepo.js.map