"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = __importDefault(require("./routes/auth"));
const node_1 = __importDefault(require("./routes/node"));
const path_1 = __importDefault(require("./routes/path"));
const userRoute_1 = __importDefault(require("./routes/userRoute"));
const driver_1 = __importDefault(require("./routes/driver"));
const vehicleType_1 = __importDefault(require("./routes/vehicleType"));
const line_1 = __importDefault(require("./routes/line"));
const fileImport_1 = __importDefault(require("./routes/fileImport"));
const tripResult_1 = __importDefault(require("./routes/tripResult"));
// guaranteed to get dependencies
exports.default = () => {
    const app = express_1.Router();
    auth_1.default(app);
    userRoute_1.default(app);
    node_1.default(app);
    path_1.default(app);
    driver_1.default(app);
    vehicleType_1.default(app);
    line_1.default(app);
    fileImport_1.default(app);
    tripResult_1.default(app);
    return app;
};
//# sourceMappingURL=index.js.map