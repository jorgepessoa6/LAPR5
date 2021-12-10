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
const Result_1 = require("../core/logic/Result");
const tripulante_1 = require("../models/tripulante");
const config_1 = __importDefault(require("../config"));
const tripulanteRepo_1 = __importDefault(require("../repo/tripulanteRepo"));
let TripulanteService = class TripulanteService {
    constructor(tripulanteRepo) {
        this.tripulanteRepo = tripulanteRepo;
    }
    async createTripulante(tripulanteDTO) {
        try {
            const tripulanteOrError = await tripulante_1.Tripulante.create(tripulanteDTO);
            if (tripulanteOrError.isFailure) {
                return Result_1.Result.fail(tripulanteOrError.errorValue());
            }
            const tripulanteResult = tripulanteOrError.getValue();
            await this.tripulanteRepo.save(tripulanteResult);
            const tripulanteDTOResult = tripulanteMapper_1.default.toDTO(tripulanteResult);
            //RETURN
            return Result_1.Result.ok(tripulanteDTOResult);
        }
        catch (e) {
            throw e;
        }
    }
};
TripulanteService = __decorate([
    typedi_1.Service(),
    __param(0, typedi_1.Inject(config_1.default.repos.tripulante.name)),
    __metadata("design:paramtypes", [tripulanteRepo_1.default])
], TripulanteService);
exports.default = TripulanteService;
//# sourceMappingURL=tripulanteService.js.map