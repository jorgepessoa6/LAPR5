"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const NodeSchema = new mongoose_1.default.Schema({
    /*   domainId: { type: String, unique: true },
   */
    key: { type: String, required: true, unique: true },
    name: { type: String, unique: true, max: 200 },
    latitude: { type: Number },
    longitude: { type: Number },
    shortName: { type: String, required: true, unique: true, max: 20 },
    isDepot: { type: Boolean },
    isReliefPoint: { type: Boolean },
    capacities: { type: Array() },
    informationPoint: { type: Array() },
    crewTravelTimes: { type: Array() }
}, {
    timestamps: true
});
exports.default = mongoose_1.default.model('Node', NodeSchema);
//# sourceMappingURL=nodeSchema.js.map