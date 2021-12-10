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
const pathMapper_1 = require("../mappers/pathMapper");
const Result_1 = require("../core/logic/Result");
const path_1 = require("../models/path");
const linePath_1 = require("../models/linePath");
const config_1 = __importDefault(require("../config"));
let PathService = class PathService {
    constructor(pathRepo, lineRepo) {
        this.pathRepo = pathRepo;
        this.lineRepo = lineRepo;
    }
    async createPath(pathDTO) {
        try {
            const roleOrError = await path_1.Path.create(pathDTO);
            if (roleOrError.isFailure) {
                return Result_1.Result.fail(roleOrError.errorValue());
            }
            const pathResult = roleOrError.getValue();
            var line = await this.lineRepo.findByKey(pathDTO.idLinha);
            if (line[0] == undefined) {
                throw new Error("Linha invalida");
            }
            const linePathOrError = await linePath_1.LinePath.create(pathDTO);
            if (linePathOrError.isFailure) {
                return Result_1.Result.fail(linePathOrError.errorValue());
            }
            const linePathResult = linePathOrError.getValue();
            if (line[0].linePath[0] == undefined) {
                line[0].linePath[0] = [];
            }
            if (line[0].linePath[0].linePath == undefined) {
                line[0].linePath[0].linePath = [];
            }
            await line[0].linePath[0].linePath.push(linePathResult);
            await this.pathRepo.save(pathResult);
            await this.lineRepo.update(line[0]);
            const roleDTOResult = pathMapper_1.PathMapper.toDTO(pathResult);
            return Result_1.Result.ok(roleDTOResult);
        }
        catch (e) {
            throw e;
        }
    }
    async createPathImport(pathDTO) {
        try {
            const roleOrError = await path_1.Path.create(pathDTO);
            if (roleOrError.isFailure) {
                return Result_1.Result.fail(roleOrError.errorValue());
            }
            const roleResult = roleOrError.getValue();
            await this.pathRepo.save(roleResult);
            const roleDTOResult = pathMapper_1.PathMapper.toDTO(roleResult);
            return Result_1.Result.ok(roleDTOResult);
        }
        catch (e) {
            throw e;
        }
    }
    async listPathsByLine(key) {
        try {
            var line = await this.lineRepo.findByKey(key);
            if (line[0].name == undefined) {
                throw new Error("Linha invalida");
            }
            var paths = [];
            var linePaths = line[0].linePath[0].linePath;
            for (var i = 0; i < linePaths.length; i++) {
                if (linePaths[i].path == undefined) {
                    paths.push(await this.pathRepo.findByKey(linePaths[i].props.path));
                }
                else {
                    paths.push(await this.pathRepo.findByKey(linePaths[i].path));
                }
            }
            return paths;
        }
        catch (e) {
            throw e;
        }
    }
    async listByName() {
        try {
            const paths = await this.pathRepo.listByName();
            return paths;
        }
        catch (e) {
            throw e;
        }
    }
};
PathService = __decorate([
    typedi_1.Service(),
    __param(0, typedi_1.Inject(config_1.default.repos.path.name)),
    __param(1, typedi_1.Inject(config_1.default.repos.line.name)),
    __metadata("design:paramtypes", [Object, Object])
], PathService);
exports.default = PathService;
//# sourceMappingURL=pathService.js.map