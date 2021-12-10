"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const UniqueEntityID_1 = require("../core/domain/UniqueEntityID");
const Mapper_1 = require("../core/infra/Mapper");
const vehicleType_1 = require("../models/vehicleType");
class VehicleTypeMapper extends Mapper_1.Mapper {
    static toDTO(vehicleType) {
        return {
            //key: vehicleType.key,
            name: vehicleType.name,
            autonomy: vehicleType.autonomy,
            cost: vehicleType.cost,
            averageSpeed: vehicleType.averageSpeed,
            energySource: vehicleType.energySource,
            consumption: vehicleType.consumption,
            emissions: vehicleType.emissions
        };
    }
    static toDomain(vehicleType) {
        const vehicleTypeOrError = vehicleType_1.VehicleType.create(vehicleType, new UniqueEntityID_1.UniqueEntityID(vehicleType.domainID));
        vehicleTypeOrError.isFailure ? console.log(vehicleTypeOrError) : '';
        return vehicleTypeOrError.isSuccess ? vehicleTypeOrError.getValue() : null;
    }
    static toPersistence(vehicleType) {
        return {
            domainID: vehicleType.id.toString(),
            //key: vehicleType.key,
            name: vehicleType.name,
            autonomy: vehicleType.autonomy,
            cost: vehicleType.cost,
            averageSpeed: vehicleType.averageSpeed,
            energySource: vehicleType.energySource,
            consumption: vehicleType.consumption,
            emissions: vehicleType.emissions
        };
    }
}
exports.default = VehicleTypeMapper;
//# sourceMappingURL=vehicleTypeMapper.js.map