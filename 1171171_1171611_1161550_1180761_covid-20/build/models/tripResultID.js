"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TripResultID = void 0;
const Entity_1 = require("../core/domain/Entity");
class TripResultID extends Entity_1.Entity {
    get id() {
        return this._id;
    }
    static create(id) {
        return new TripResultID(id);
    }
}
exports.TripResultID = TripResultID;
//# sourceMappingURL=tripResultID.js.map