"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NodeID = void 0;
const Entity_1 = require("../core/domain/Entity");
class NodeID extends Entity_1.Entity {
    get id() {
        return this._id;
    }
    static create(id) {
        return new NodeID(id);
    }
}
exports.NodeID = NodeID;
//# sourceMappingURL=nodeID.js.map