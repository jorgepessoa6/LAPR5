"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const LineSchema = new mongoose_1.default.Schema({
    key: { type: String },
    name: { type: String, unique: true },
    color: { type: String },
    linePath: { type: Array() },
    allowedDrivers: { type: Array() },
    disallowedDrivers: { type: Array() },
    allowedVehicles: { type: Array() },
    disallowedVehicles: { type: Array() },
}, {
    timestamps: true,
});
exports.default = mongoose_1.default.model('Line', LineSchema);
//# sourceMappingURL=lineSchema.js.map