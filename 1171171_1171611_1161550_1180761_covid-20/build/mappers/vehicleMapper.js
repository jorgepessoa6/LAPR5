"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const UniqueEntityID_1 = require("../core/domain/UniqueEntityID");
const Mapper_1 = require("../core/infra/Mapper");
const vehicle_1 = require("../models/vehicle");
class VehicleMapper extends Mapper_1.Mapper {
    static toDTO(vehicle) {
        return {
            //key: vehicle.key,
            name: vehicle.name,
            autonomy: vehicle.autonomy,
            cost: vehicle.cost,
            averageSpeed: vehicle.averageSpeed,
            energySource: vehicle.energySource,
            consumption: vehicle.consumption,
            emissions: vehicle.emissions
        };
    }
    static toDomain(vehicle) {
        const vehicleOrError = vehicle_1.Vehicle.create(vehicle, new UniqueEntityID_1.UniqueEntityID(vehicle.domainID));
        vehicleOrError.isFailure ? console.log(vehicleOrError) : '';
        return vehicleOrError.isSuccess ? vehicleOrError.getValue() : null;
    }
    static toPersistence(vehicle) {
        return {
            domainID: vehicle.id.toString(),
            //key: vehicle.key,
            name: vehicle.name,
            autonomy: vehicle.autonomy,
            cost: vehicle.cost,
            averageSpeed: vehicle.averageSpeed,
            energySource: vehicle.energySource,
            consumption: vehicle.consumption,
            emissions: vehicle.emissions
        };
    }
}
exports.default = VehicleMapper;
//# sourceMappingURL=vehicleMapper.js.map