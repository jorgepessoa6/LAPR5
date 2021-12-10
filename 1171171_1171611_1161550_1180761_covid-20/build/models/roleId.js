"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoleId = void 0;
const Entity_1 = require("../core/domain/Entity");
class RoleId extends Entity_1.Entity {
    get id() {
        return this._id;
    }
    static create(id) {
        return new RoleId(id);
    }
}
exports.RoleId = RoleId;
//# sourceMappingURL=roleId.js.map