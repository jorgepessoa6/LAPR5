"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LineID = void 0;
const ValueObject_1 = require("../core/domain/ValueObject");
class LineID extends ValueObject_1.ValueObject {
    get id() {
        return this.id;
    }
    constructor(id) {
        super(id);
    }
    static create(id) {
        return new LineID(id);
    }
}
exports.LineID = LineID;
//# sourceMappingURL=lineID.js.map