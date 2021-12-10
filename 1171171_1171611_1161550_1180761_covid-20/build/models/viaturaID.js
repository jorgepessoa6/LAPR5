"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ViaturaID = void 0;
const Entity_1 = require("../core/domain/Entity");
class ViaturaID extends Entity_1.Entity {
    get id() {
        return this._id;
    }
    static create(id) {
        return new ViaturaID(id);
    }
}
exports.ViaturaID = ViaturaID;
//# sourceMappingURL=viaturaID.js.map