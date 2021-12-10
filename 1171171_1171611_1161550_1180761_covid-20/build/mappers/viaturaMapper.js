"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const UniqueEntityID_1 = require("../core/domain/UniqueEntityID");
const Mapper_1 = require("../core/infra/Mapper");
const viatura_1 = require("../models/viatura");
class ViaturaMapper extends Mapper_1.Mapper {
    static toDTO(viatura) {
        return {
            key: viatura.key,
            name: viatura.name,
            autonomy: viatura.autonomy,
            cost: viatura.cost,
            averageSpeed: viatura.averageSpeed,
            energySource: viatura.energySource,
            consumption: viatura.consumption,
            emissions: viatura.emissions
        };
    }
    static toDomain(viatura) {
        const viaturaOrError = viatura_1.Viatura.create(viatura, new UniqueEntityID_1.UniqueEntityID(viatura.domainID));
        viaturaOrError.isFailure ? console.log(viaturaOrError) : '';
        return viaturaOrError.isSuccess ? viaturaOrError.getValue() : null;
    }
    static toPersistence(viatura) {
        return {
            key: viatura.key,
            name: viatura.name,
            autonomy: viatura.autonomy,
            cost: viatura.cost,
            averageSpeed: viatura.averageSpeed,
            energySource: viatura.energySource,
            consumption: viatura.consumption,
            emissions: viatura.emissions
        };
    }
}
exports.default = ViaturaMapper;
//# sourceMappingURL=viaturaMapper.js.map