"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const RgbSchema = new mongoose_1.default.Schema({
    red: { type: Number },
    green: { type: Number },
    blue: { type: Number },
});
exports.default = mongoose_1.default.model('RGB', RgbSchema);
//# sourceMappingURL=rgbSchema.js.map