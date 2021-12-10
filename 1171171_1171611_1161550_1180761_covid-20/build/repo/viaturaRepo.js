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
const viaturaMapper_1 = __importDefault(require("../mappers/viaturaMapper"));
const mongoose_1 = require("mongoose");
const viaturaID_1 = require("../models/viaturaID");
let ViaturaRepo = class ViaturaRepo {
    constructor(viaturaSchema) {
        this.viaturaSchema = viaturaSchema;
    }
    createBaseQuery() {
        return {
            where: {},
        };
    }
    async exists(viaturaID) {
        const idX = viaturaID instanceof viaturaID_1.ViaturaID ? viaturaID.id.toValue() : viaturaID;
        const query = { domainId: idX };
        const viaturaDocument = await this.viaturaSchema.findOne(query);
        return !!viaturaDocument === true;
    }
    async save(viatura) {
        const query = { domainId: viatura.id.toString() };
        const viaturaDocument = await this.viaturaSchema.findOne(query);
        try {
            if (viaturaDocument === null) {
                const rawViatura = viaturaMapper_1.default.toPersistence(viatura);
                const viaturaCreated = await this.viaturaSchema.create(rawViatura);
                return viaturaMapper_1.default.toDomain(viaturaCreated);
            }
            else {
                viaturaDocument.name = viatura.name;
                await viaturaDocument.save();
                return viatura;
            }
        }
        catch (err) {
            throw err;
        }
    }
    async findByDomainId(viaturaID) {
        const query = { domainId: viaturaID };
        const viaturaRecord = await this.viaturaSchema.findOne(query);
        if (viaturaRecord != null) {
            return viaturaMapper_1.default.toDomain(viaturaRecord);
        }
        else
            return null;
    }
};
ViaturaRepo = __decorate([
    typedi_1.Service(),
    __param(0, typedi_1.Inject('viaturaSchema')),
    __metadata("design:paramtypes", [mongoose_1.Model])
], ViaturaRepo);
exports.default = ViaturaRepo;
//# sourceMappingURL=viaturaRepo.js.map