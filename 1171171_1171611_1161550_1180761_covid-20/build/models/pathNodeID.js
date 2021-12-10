"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PathNodeID = void 0;
const Entity_1 = require("../core/domain/Entity");
class PathNodeID extends Entity_1.Entity {
    get id() {
        return this._id;
    }
    static create(id) {
        return new PathNodeID(id);
    }
}
exports.PathNodeID = PathNodeID;
//# sourceMappingURL=pathNodeID.js.map