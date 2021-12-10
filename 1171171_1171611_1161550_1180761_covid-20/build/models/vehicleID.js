"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Entity_1 = require("../core/domain/Entity");
class VehicleID extends Entity_1.Entity {
    get id() {
        return this._id;
    }
    static create(id) {
        return new VehicleID(id);
    }
}
exports.VehicleID = VehicleID;
//# sourceMappingURL=vehicleID.js.map