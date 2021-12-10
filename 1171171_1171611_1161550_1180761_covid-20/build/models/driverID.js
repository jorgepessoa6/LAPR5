"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DriverID = void 0;
const Entity_1 = require("../core/domain/Entity");
class DriverID extends Entity_1.Entity {
    get id() {
        return this._id;
    }
    static create(id) {
        return new DriverID(id);
    }
}
exports.DriverID = DriverID;
//# sourceMappingURL=driverID.js.map