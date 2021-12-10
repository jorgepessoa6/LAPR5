"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PathID = void 0;
const Entity_1 = require("../core/domain/Entity");
class PathID extends Entity_1.Entity {
    get id() {
        return this._id;
    }
    static create(id) {
        return new PathID(id);
    }
}
exports.PathID = PathID;
//# sourceMappingURL=pathID.js.map