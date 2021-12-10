"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LineMapper = void 0;
const line_1 = require("../models/line");
const Mapper_1 = require("../core/infra/Mapper");
const UniqueEntityID_1 = require("../core/domain/UniqueEntityID");
class LineMapper extends Mapper_1.Mapper {
    static toDTO(line) {
        return {
            key: line.key,
            name: line.name,
            color: line.color,
            linePath: line.linePath,
            allowedVehicles: line.allowedVehicles,
            disallowedVehicles: line.disallowedVehicles,
            allowedDrivers: line.allowedDrivers,
            disallowedDrivers: line.disallowedDrivers,
        };
    }
    static toDomain(line) {
        const pathOrError = line_1.Line.create(line, new UniqueEntityID_1.UniqueEntityID(line.domainID));
        pathOrError.isFailure ? console.log(pathOrError) : '';
        return pathOrError.isSuccess ? pathOrError.getValue() : null;
    }
    static toPersistence(line) {
        return {
            domainID: line.id.toString(),
            key: line.key,
            name: line.name,
            color: line.color,
            linePath: line.linePath,
            allowedVehicles: line.allowedVehicles,
            disallowedVehicles: line.disallowedVehicles,
            allowedDrivers: line.allowedDrivers,
            disallowedDrivers: line.disallowedDrivers,
        };
    }
}
exports.LineMapper = LineMapper;
//# sourceMappingURL=lineMapper.js.map