"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const TripResultSchema = new mongoose_1.default.Schema({
    time: { type: Number },
    noI: { type: String },
    noF: { type: String },
    caminho: { type: Array() },
    finalTime: { type: Number }
}, {
    timestamps: true
});
exports.default = mongoose_1.default.model('TripResult', TripResultSchema);
//# sourceMappingURL=tripResultSchema.js.map