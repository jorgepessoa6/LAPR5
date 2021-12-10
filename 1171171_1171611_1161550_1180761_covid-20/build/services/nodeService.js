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
const nodeMapper_1 = require("../mappers/nodeMapper");
const Result_1 = require("../core/logic/Result");
const node_1 = require("../models/node");
const config_1 = __importDefault(require("../config"));
let NodeService = class NodeService {
    constructor(nodeRepo) {
        this.nodeRepo = nodeRepo;
    }
    async createNode(nodeDTO) {
        try {
            const nodeOrError = await node_1.Node.create(nodeDTO);
            if (nodeOrError.isFailure) {
                return Result_1.Result.fail(nodeOrError.errorValue());
            }
            const nodeResult = nodeOrError.getValue();
            await this.nodeRepo.save(nodeResult);
            const nodeDTOResult = nodeMapper_1.NodeMapper.toDTO(nodeResult);
            return Result_1.Result.ok(nodeDTOResult);
        }
        catch (e) {
            throw e;
        }
    }
    async listByName() {
        try {
            const nodes = await this.nodeRepo.listByName();
            return nodes;
            //return Result.ok<string[]>(nodes);
        }
        catch (e) {
            throw e;
        }
    }
    async listByCode() {
        try {
            const nodes = await this.nodeRepo.listByCode();
            return nodes;
            //return Result.ok<string[]>(nodes);
        }
        catch (e) {
            throw e;
        }
    }
    async filterByName(key) {
        try {
            const nodes = await this.nodeRepo.filterByName(key);
            return nodes;
            //return Result.ok<string[]>(nodes);
        }
        catch (e) {
            throw e;
        }
    }
    async filterCode(key) {
        try {
            const nodes = await this.nodeRepo.filterCode(key);
            return nodes;
            //return Result.ok<string[]>(nodes);
        }
        catch (e) {
            throw e;
        }
    }
};
NodeService = __decorate([
    typedi_1.Service(),
    __param(0, typedi_1.Inject(config_1.default.repos.node.name)),
    __metadata("design:paramtypes", [Object])
], NodeService);
exports.default = NodeService;
//# sourceMappingURL=nodeService.js.map