"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TripResultMapper = void 0;
const UniqueEntityID_1 = require("../core/domain/UniqueEntityID");
const Mapper_1 = require("../core/infra/Mapper");
const tripResult_1 = require("../models/tripResult");
class TripResultMapper extends Mapper_1.Mapper {
    static toDTO(tripResult) {
        return {
            time: tripResult.time,
            noI: tripResult.noI,
            noF: tripResult.noF,
            caminho: tripResult.caminho,
            finalTime: tripResult.finalTime
        };
    }
    static toDomain(tripResult) {
        const tripResultOrError = tripResult_1.TripResult.create(tripResult, new UniqueEntityID_1.UniqueEntityID(tripResult.domainID));
        tripResultOrError.isFailure ? console.log(tripResultOrError) : '';
        return tripResultOrError.isSuccess ? tripResultOrError.getValue() : null;
    }
    static toPersistence(tripResult) {
        return {
            domainId: tripResult.id.toString(),
            time: tripResult.time,
            noI: tripResult.noI,
            noF: tripResult.noF,
            caminho: tripResult.caminho,
            finalTime: tripResult.finalTime
        };
    }
}
exports.TripResultMapper = TripResultMapper;
//# sourceMappingURL=tripResultMapper.js.map