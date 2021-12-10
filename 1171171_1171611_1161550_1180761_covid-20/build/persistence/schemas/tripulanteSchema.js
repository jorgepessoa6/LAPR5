"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const TripulanteSchema = new mongoose_1.default.Schema({
    //domainId: { type: String, unique: true },
    key: { type: String, unique: true },
    name: { type: String },
    description: { type: String }
}, {
    timestamps: true
});
exports.default = mongoose_1.default.model('Tripulante', TripulanteSchema);
//# sourceMappingURL=tripulanteSchema.js.map