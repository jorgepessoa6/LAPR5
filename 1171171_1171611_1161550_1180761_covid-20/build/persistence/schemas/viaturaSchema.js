"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const ViaturaSchema = new mongoose_1.default.Schema({
    domainId: { type: String, unique: true },
    key: { type: String, unique: true },
    name: { type: String },
    autonomy: { type: Number },
    cost: { type: Number },
    averageSpeed: { type: Number },
    energySource: { type: Number },
    consumption: { type: Number },
    emissions: { type: Number }
}, {
    timestamps: true
});
exports.default = mongoose_1.default.model('Viatura', ViaturaSchema);
//# sourceMappingURL=viaturaSchema.js.map