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
const Result_1 = require("../core/logic/Result");
const config_1 = __importDefault(require("../config"));
const tripResult_1 = require("../models/tripResult");
const tripResultMapper_1 = require("../mappers/tripResultMapper");
let TripResultService = class TripResultService {
    constructor(resultRepo) {
        this.resultRepo = resultRepo;
    }
    async createResult(resultDTO) {
        try {
            const resultOrError = await tripResult_1.TripResult.create(resultDTO);
            if (resultOrError.isFailure) {
                return Result_1.Result.fail(resultOrError.errorValue());
            }
            const resultResult = resultOrError.getValue();
            await this.resultRepo.save(resultResult);
            const resultDTOResult = tripResultMapper_1.TripResultMapper.toDTO(resultResult);
            return Result_1.Result.ok(resultDTOResult);
        }
        catch (e) {
            throw e;
        }
    }
    async listarTripResults() {
        try {
            const tripResults = await this.resultRepo.listarTripResults();
            return tripResults;
            //return Result.ok<string[]>(nodes);
        }
        catch (e) {
            throw e;
        }
    }
};
TripResultService = __decorate([
    typedi_1.Service(),
    __param(0, typedi_1.Inject(config_1.default.repos.tripResult.name)),
    __metadata("design:paramtypes", [Object])
], TripResultService);
exports.default = TripResultService;
//# sourceMappingURL=tripResultService.js.map