"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const VehicleTypeSchema = new mongoose_1.default.Schema({
    //domainId: { type: String, unique: true },
    //key: { type: String, required:true },
    name: { type: String, required: true },
    autonomy: {
        type: Number,
        min: 1,
        validate: {
            validator: Number.isInteger,
            message: '{VALUE} is not an integer value'
        }
    },
    cost: {
        type: Number,
        min: 0,
    },
    averageSpeed: {
        type: Number,
        min: 1
    },
    energySource: {
        type: Number,
        enum: [1, 20, 23, 50, 75]
    },
    consumption: { type: Number },
    emissions: { type: Number },
    ParametersValue: { type: Array() },
    Vehicles: { type: Array() }
}, {
    timestamps: true
});
//VehicleSchema.path('energySource').options.enum; // [enum só aceita os valores 1, 20, 23, 50, 75]
//correspondem a Gasolina, GPL, Gasoleo, Hidrgoenio, Eletrico
exports.default = mongoose_1.default.model('VehicleType', VehicleTypeSchema);
//# sourceMappingURL=vehicleTypeSchema.js.map