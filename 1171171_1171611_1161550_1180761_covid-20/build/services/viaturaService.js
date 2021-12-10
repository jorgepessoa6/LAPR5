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
const Result_1 = require("../core/logic/Result");
const viatura_1 = require("../models/viatura");
const config_1 = __importDefault(require("../config"));
const viaturaRepo_1 = __importDefault(require("../repo/viaturaRepo"));
let ViaturaService = class ViaturaService {
    constructor(viaturaRepo) {
        this.viaturaRepo = viaturaRepo;
    }
    async createViatura(viaturaDTO) {
        try {
            const viaturaOrError = await viatura_1.Viatura.create(viaturaDTO);
            if (viaturaOrError.isFailure) {
                return Result_1.Result.fail(viaturaOrError.errorValue());
            }
            const viaturaResult = viaturaOrError.getValue();
            await this.viaturaRepo.save(viaturaResult);
            const viaturaDTOResult = viaturaMapper_1.default.toDTO(viaturaResult);
            //RETURN
            return Result_1.Result.ok(viaturaDTOResult);
        }
        catch (e) {
            throw e;
        }
    }
};
ViaturaService = __decorate([
    typedi_1.Service(),
    __param(0, typedi_1.Inject(config_1.default.repos.viatura.name)),
    __metadata("design:paramtypes", [viaturaRepo_1.default])
], ViaturaService);
exports.default = ViaturaService;
//# sourceMappingURL=viaturaService.js.map