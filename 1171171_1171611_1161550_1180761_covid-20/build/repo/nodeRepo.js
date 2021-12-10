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
const nodeMapper_1 = require("../mappers/nodeMapper");
const mongoose_1 = require("mongoose");
const nodeID_1 = require("../models/nodeID");
let NodeRepo = class NodeRepo {
    constructor(nodeSchema) {
        this.nodeSchema = nodeSchema;
    }
    createBaseQuery() {
        return {
            where: {},
        };
    }
    async exists(nodeID) {
        const idX = nodeID instanceof nodeID_1.NodeID ? nodeID.id.toValue() : nodeID;
        const query = { domainId: idX };
        const nodeDocument = await this.nodeSchema.findOne(query);
        return !!nodeDocument === true;
    }
    async save(node) {
        const query = { domainId: node.id.toString() };
        const nodeDocument = await this.nodeSchema.findOne(query);
        try {
            if (nodeDocument === null) {
                const rawNode = nodeMapper_1.NodeMapper.toPersistence(node);
                const nodeCreated = await this.nodeSchema.create(rawNode);
                console.log(nodeCreated);
                const returnNode = nodeMapper_1.NodeMapper.toDomain(nodeCreated);
                console.log(returnNode);
                return returnNode;
            }
            else {
                nodeDocument.name = node.name;
                await nodeDocument.save();
                return node;
            }
        }
        catch (err) {
            throw err;
        }
    }
    async findByDomainId(nodeID) {
        const query = { domainId: nodeID };
        const nodeRecord = await this.nodeSchema.findOne(query);
        if (nodeRecord != null) {
            return nodeMapper_1.NodeMapper.toDomain(nodeRecord);
        }
        else
            return null;
    }
    async listByName() {
        return new Promise((resolve, reject) => {
            this.nodeSchema.aggregate([
                /*  {
                   "$group":
                   {
                     _id: "$name",
                     total: { "$sum": "$name" }
                   }
                 }, */
                {
                    "$sort": { name: 1 }
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
            this.nodeSchema.aggregate([
                /*  {
                   "$group":
                   {
                     _id: "$name",
                     total: { "$sum": "$name" }
                   }
                 }, */
                {
                    "$sort": { key: 1 }
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
            this.nodeSchema.find({ name: { $regex: '^' + keyReq } }, (error, result) => {
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
        console.log(keyReq);
        return new Promise((resolve, reject) => {
            this.nodeSchema.find({ key: { $regex: keyReq } }, (error, result) => {
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
NodeRepo = __decorate([
    typedi_1.Service(),
    __param(0, typedi_1.Inject('Node')),
    __metadata("design:paramtypes", [mongoose_1.Model])
], NodeRepo);
exports.default = NodeRepo;
//# sourceMappingURL=nodeRepo.js.map