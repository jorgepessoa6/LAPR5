"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PathMapper = void 0;
const UniqueEntityID_1 = require("../core/domain/UniqueEntityID");
const Mapper_1 = require("../core/infra/Mapper");
const path_1 = require("../models/path");
class PathMapper extends Mapper_1.Mapper {
    static toDTO(path) {
        return {
            key: path.key,
            isEmpty: path.isEmpty,
            pathNodes: path.pathNodes
        };
    }
    static toDomain(path) {
        const pathOrError = path_1.Path.create(path, new UniqueEntityID_1.UniqueEntityID(path.domainID));
        pathOrError.isFailure ? console.log(pathOrError) : '';
        return pathOrError.isSuccess ? pathOrError.getValue() : null;
    }
    static toPersistence(path) {
        return {
            domainId: path.id.toString(),
            key: path.key,
            isEmpty: path.isEmpty,
            pathNodes: path.pathNodes
        };
    }
}
exports.PathMapper = PathMapper;
//# sourceMappingURL=pathMapper.js.map