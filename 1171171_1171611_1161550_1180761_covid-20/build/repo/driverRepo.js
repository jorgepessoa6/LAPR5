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
const mongoose_1 = require("mongoose");
const driverID_1 = require("../models/driverID");
let DriverRepo = class DriverRepo {
    constructor(driverSchema) {
        this.driverSchema = driverSchema;
    }
    createBaseQuery() {
        return {
            where: {},
        };
    }
    async exists(driverID) {
        const idX = driverID instanceof driverID_1.DriverID ? driverID.id.toValue() : driverID;
        const query = { domainId: idX };
        const driverDocument = await this.driverSchema.findOne(query);
        return !!driverDocument === true;
    }
    async save(driver) {
        const query = { domainId: driver.id.toString() };
        const driverDocument = await this.driverSchema.findOne(query);
        try {
            if (driverDocument === null) {
                const rawDriver = driverMapper_1.default.toPersistence(driver);
                const driverCreated = await this.driverSchema.create(rawDriver);
                return driverMapper_1.default.toDomain(driverCreated);
            }
            else {
                driverDocument.name = driver.name;
                await driverDocument.save();
                return driver;
            }
        }
        catch (err) {
            throw err;
        }
    }
    async findByDomainId(driverID) {
        const query = { domainId: driverID };
        const driverRecord = await this.driverSchema.findOne(query);
        if (driverRecord != null) {
            return driverMapper_1.default.toDomain(driverRecord);
        }
        else
            return null;
    }
};
DriverRepo = __decorate([
    typedi_1.Service(),
    __param(0, typedi_1.Inject('Driver')),
    __metadata("design:paramtypes", [mongoose_1.Model])
], DriverRepo);
exports.default = DriverRepo;
//# sourceMappingURL=driverRepo.js.map