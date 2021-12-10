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
const tripulanteMapper_1 = __importDefault(require("../mappers/tripulanteMapper"));
const mongoose_1 = require("mongoose");
const tripulanteID_1 = require("../models/tripulanteID");
let TripulanteRepo = class TripulanteRepo {
    constructor(tripulanteSchema) {
        this.tripulanteSchema = tripulanteSchema;
    }
    createBaseQuery() {
        return {
            where: {},
        };
    }
    async exists(tripulanteID) {
        const idX = tripulanteID instanceof tripulanteID_1.TripulanteID ? tripulanteID.id.toValue() : tripulanteID;
        const query = { domainId: idX };
        const tripulanteDocument = await this.tripulanteSchema.findOne(query);
        return !!tripulanteDocument === true;
    }
    async save(tripulante) {
        const query = { domainId: tripulante.id.toString() };
        const tripulanteDocument = await this.tripulanteSchema.findOne(query);
        try {
            if (tripulanteDocument === null) {
                const rawTripulante = tripulanteMapper_1.default.toPersistence(tripulante);
                const tripulanteCreated = await this.tripulanteSchema.create(rawTripulante);
                return tripulanteMapper_1.default.toDomain(tripulanteCreated);
            }
            else {
                tripulanteDocument.name = tripulante.name;
                await tripulanteDocument.save();
                return tripulante;
            }
        }
        catch (err) {
            throw err;
        }
    }
    async findByDomainId(tripulanteID) {
        const query = { domainId: tripulanteID };
        const tripulanteRecord = await this.tripulanteSchema.findOne(query);
        if (tripulanteRecord != null) {
            return tripulanteMapper_1.default.toDomain(tripulanteRecord);
        }
        else
            return null;
    }
};
TripulanteRepo = __decorate([
    typedi_1.Service(),
    __param(0, typedi_1.Inject('tripulanteSchema')),
    __metadata("design:paramtypes", [mongoose_1.Model])
], TripulanteRepo);
exports.default = TripulanteRepo;
//# sourceMappingURL=tripulanteRepo.js.map