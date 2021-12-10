"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const DriverSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        minlength: 20,
        maxlength: 250
    }
}, {
    timestamps: true
});
exports.default = mongoose_1.default.model('Driver', DriverSchema);
//# sourceMappingURL=driverSchema.js.map