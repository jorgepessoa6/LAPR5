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
const lineID_1 = require("../models/lineID");
const lineMapper_1 = require("../mappers/lineMapper");
let LineRepo = class LineRepo {
    constructor(lineSchema) {
        this.lineSchema = lineSchema;
    }
    createBaseQuery() {
        return {
            where: {},
        };
    }
    async exists(lineID) {
        const idX = lineID instanceof lineID_1.LineID ? lineID.id.toValue() : lineID;
        const query = { domainId: idX };
        const lineDocument = await this.lineSchema.findOne(query);
        return !!lineDocument === true;
    }
    async save(line) {
        const query = { domainId: line.id };
        const lineDocument = await this.lineSchema.findOne(query);
        try {
            if (lineDocument === null) {
                const rawLine = lineMapper_1.LineMapper.toPersistence(line);
                const lineCreated = await this.lineSchema.create(rawLine);
                return lineMapper_1.LineMapper.toDomain(lineCreated);
            }
            else {
                lineDocument.name = line.name;
                await lineDocument.save();
                return line;
            }
        }
        catch (err) {
            throw err;
        }
    }
    async update(line) {
        const query = { key: line.key };
        const lineDocument = await this.lineSchema.findOne(query);
        try {
            if (lineDocument === null) {
                const rawLine = lineMapper_1.LineMapper.toPersistence(line);
                const lineCreated = await this.lineSchema.create(rawLine);
                return lineMapper_1.LineMapper.toDomain(lineCreated);
            }
            else {
                lineDocument.name = line.name;
                lineDocument.linePath = [];
                line.linePath.forEach(element => {
                    lineDocument.linePath.push(element);
                });
                await lineDocument.save();
                return line;
            }
        }
        catch (err) {
            throw err;
        }
    }
    async findByDomainId(lineID) {
        const query = { domainId: lineID };
        const lineRecord = await this.lineSchema.findOne(query);
        if (lineRecord != null) {
            return lineMapper_1.LineMapper.toDomain(lineRecord);
        }
        else
            return null;
    }
    async findByKey(keyReq) {
        return new Promise((resolve, reject) => {
            this.lineSchema.aggregate([
                { "$match": { name: keyReq } }
            ], (error, result) => {
                if (error)
                    reject(error);
                else {
                    resolve(result);
                }
            });
        });
    }
    async listByName() {
        return new Promise((resolve, reject) => {
            this.lineSchema.aggregate([
                /*  {
                "$group":
                {
                  _id: "$name",
                  total: { "$sum": "$name" }
                }
              }, */
                {
                    "$sort": { name: 1 },
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
    async listByCode() {
        return new Promise((resolve, reject) => {
            this.lineSchema.aggregate([
                /*  {
                "$group":
                {
                  _id: "$name",
                  total: { "$sum": "$name" }
                }
              }, */
                {
                    "$sort": { key: 1 },
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
    async filterByName(keyReq) {
        console.log(keyReq);
        return new Promise((resolve, reject) => {
            this.lineSchema.find({ name: { $regex: '^' + keyReq } }, (error, result) => {
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
    async filterCode(keyReq) {
        return new Promise((resolve, reject) => {
            this.lineSchema.find({ key: { $regex: '^' + keyReq } }, (error, result) => {
                if (error)
                    reject(error);
                else {
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
LineRepo = __decorate([
    typedi_1.Service('LineRepo'),
    __param(0, typedi_1.Inject('Line')),
    __metadata("design:paramtypes", [mongoose_1.Model])
], LineRepo);
exports.default = LineRepo;
//# sourceMappingURL=lineRepo.js.map