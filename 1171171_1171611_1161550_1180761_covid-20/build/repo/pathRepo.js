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
const typedi_1 = require("typedi");
const pathMapper_1 = require("../mappers/pathMapper");
const mongoose_1 = require("mongoose");
const pathID_1 = require("../models/pathID");
let PathRepo = class PathRepo {
    constructor(pathSchema) {
        this.pathSchema = pathSchema;
    }
    createBaseQuery() {
        return {
            where: {},
        };
    }
    async exists(pathID) {
        const idX = pathID instanceof pathID_1.PathID ? pathID.id.toValue() : pathID;
        const query = { id: idX };
        const pathDocument = await this.pathSchema.findOne(query);
        return !!pathDocument === true;
    }
    async save(path) {
        const query = { id: path.id.toString() };
        const pathDocument = await this.pathSchema.findOne(query);
        try {
            if (pathDocument === null) {
                const rawPath = pathMapper_1.PathMapper.toPersistence(path);
                const pathCreated = await this.pathSchema.create(rawPath);
                const returnPath = pathMapper_1.PathMapper.toDomain(pathCreated);
                return returnPath;
            }
            else {
                pathDocument.id = path.id;
                await pathDocument.save();
                return path;
            }
        }
        catch (err) {
            throw err;
        }
    }
    async findByDomainId(pathID) {
        const query = { id: pathID };
        const pathRecord = await this.pathSchema.findOne(query);
        if (pathRecord != null) {
            return pathMapper_1.PathMapper.toDomain(pathRecord);
        }
        else
            return null;
    }
    async findByKey(keyReq) {
        return new Promise((resolve, reject) => {
            this.pathSchema.aggregate([
                { "$match": { key: keyReq } }
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
            this.pathSchema.aggregate([
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
};
PathRepo = __decorate([
    typedi_1.Service(),
    __param(0, typedi_1.Inject('Path')),
    __metadata("design:paramtypes", [mongoose_1.Model])
], PathRepo);
exports.default = PathRepo;
//# sourceMappingURL=pathRepo.js.map