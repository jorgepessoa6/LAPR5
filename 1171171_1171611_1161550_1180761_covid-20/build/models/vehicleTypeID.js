"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VehicleTypeID = void 0;
const Entity_1 = require("../core/domain/Entity");
class VehicleTypeID extends Entity_1.Entity {
    get id() {
        return this._id;
    }
    static create(id) {
        return new VehicleTypeID(id);
    }
}
exports.VehicleTypeID = VehicleTypeID;
//# sourceMappingURL=vehicleTypeID.js.map