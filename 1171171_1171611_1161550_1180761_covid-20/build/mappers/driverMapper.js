"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const UniqueEntityID_1 = require("../core/domain/UniqueEntityID");
const Mapper_1 = require("../core/infra/Mapper");
const driver_1 = require("../models/driver");
class DriverMapper extends Mapper_1.Mapper {
    static toDTO(driver) {
        return {
            // key: driver.key,
            name: driver.name,
            description: driver.description
        };
    }
    static toDomain(driver) {
        const driverOrError = driver_1.Driver.create(driver, new UniqueEntityID_1.UniqueEntityID(driver.domainID));
        driverOrError.isFailure ? console.log(driverOrError) : '';
        return driverOrError.isSuccess ? driverOrError.getValue() : null;
    }
    static toPersistence(driver) {
        return {
            domainID: driver.id.toString(),
            //key: driver.key,
            name: driver.name,
            description: driver.description
        };
    }
}
exports.default = DriverMapper;
//# sourceMappingURL=driverMapper.js.map