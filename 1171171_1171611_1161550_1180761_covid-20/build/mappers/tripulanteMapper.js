"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const UniqueEntityID_1 = require("../core/domain/UniqueEntityID");
const Mapper_1 = require("../core/infra/Mapper");
const tripulante_1 = require("../models/tripulante");
class TripulanteMapper extends Mapper_1.Mapper {
    static toDTO(tripulante) {
        return {
            key: tripulante.key,
            name: tripulante.name,
            description: tripulante.description
        };
    }
    static toDomain(tripulante) {
        const tripulanteOrError = tripulante_1.Tripulante.create(tripulante, new UniqueEntityID_1.UniqueEntityID(tripulante.domainID));
        tripulanteOrError.isFailure ? console.log(tripulanteOrError) : '';
        return tripulanteOrError.isSuccess ? tripulanteOrError.getValue() : null;
    }
    static toPersistence(tripulante) {
        return {
            key: tripulante.key,
            name: tripulante.name,
            description: tripulante.description
        };
    }
}
exports.default = TripulanteMapper;
//# sourceMappingURL=tripulanteMapper.js.map