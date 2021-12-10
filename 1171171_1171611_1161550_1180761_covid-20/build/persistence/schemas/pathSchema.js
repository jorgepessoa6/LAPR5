"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const PathSchema = new mongoose_1.default.Schema({
    key: { type: String, unique: true },
    isEmpty: { type: Boolean },
    pathNodes: { type: Array() },
}, {
    timestamps: true
});
exports.default = mongoose_1.default.model('Path', PathSchema);
//# sourceMappingURL=pathSchema.js.map