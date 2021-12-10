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
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const typedi_1 = require("typedi");
const tripResultMapper_1 = require("../mappers/tripResultMapper");
const tripResultID_1 = require("../models/tripResultID");
let TripResultRepo = class TripResultRepo {
    constructor(tripResultSchema) {
        this.tripResultSchema = tripResultSchema;
    }
    createBaseQuery() {
        return {
            where: {},
        };
    }
    async exists(tripResultID) {
        const idX = tripResultID instanceof tripResultID_1.TripResultID ? tripResultID.id.toValue() : tripResultID;
        const query = { id: idX };
        const tripResultDocument = await this.tripResultSchema.findOne(query);
        return !!tripResultDocument === true;
    }
    async save(tripResult) {
        const query = { id: tripResult.id.toString() };
        const tripResultDocument = await this.tripResultSchema.findOne(query);
        try {
            if (tripResultDocument === null) {
                const rawTripResult = tripResultMapper_1.TripResultMapper.toPersistence(tripResult);
                const tripResultCreated = await this.tripResultSchema.create(rawTripResult);
                const returnTripResult = tripResultMapper_1.TripResultMapper.toDomain(tripResultCreated);
                return returnTripResult;
            }
            else {
                tripResultDocument.id = tripResult.id;
                await tripResultDocument.save();
                return tripResult;
            }
        }
        catch (err) {
            throw err;
        }
    }
    async listarTripResults() {
        return new Promise((resolve, reject) => {
            this.tripResultSchema.aggregate([
                /*  {
                   "$group":
                   {
                     _id: "$name",
                     total: { "$sum": "$name" }
                   }
                 }, */
                {
                    "$sort": { time: 1 }
                },
            ], (error, result) => {
                if (error)
                    reject(error);
                else {
                    console.log(result);
                    let nodes = [];
                    result.forEach(function (element) {
                        nodes.push(element);
                    });
                    resolve(nodes);
                }
            });
        });
    }
};
TripResultRepo = __decorate([
    typedi_1.Service(),
    __param(0, typedi_1.Inject('TripResult')),
    __metadata("design:paramtypes", [mongoose_1.Model])
], TripResultRepo);
exports.default = TripResultRepo;
//# sourceMappingURL=tripResultRepo.js.map