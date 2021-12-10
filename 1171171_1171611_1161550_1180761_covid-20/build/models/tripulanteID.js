"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TripulanteID = void 0;
const Entity_1 = require("../core/domain/Entity");
class TripulanteID extends Entity_1.Entity {
    get id() {
        return this._id;
    }
    static create(id) {
        return new TripulanteID(id);
    }
}
exports.TripulanteID = TripulanteID;
//# sourceMappingURL=tripulanteID.js.map