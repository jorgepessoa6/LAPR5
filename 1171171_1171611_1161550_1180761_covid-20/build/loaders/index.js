"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = __importDefault(require("../config"));
const dependencyInjector_1 = __importDefault(require("./dependencyInjector"));
const express_1 = __importDefault(require("./express"));
const logger_1 = __importDefault(require("./logger"));
const mongoose_1 = __importDefault(require("./mongoose"));
exports.default = async ({ expressApp }) => {
    const mongoConnection = await mongoose_1.default();
    logger_1.default.info('✌️ DB loaded and connected!');
    const userSchema = {
        // compare with the approach followed in repos and services
        name: 'userSchema',
        schema: '../persistence/schemas/userSchema',
    };
    const lineSchema = {
        // compare with the approach followed in repos and services
        name: 'Line',
        schema: '../persistence/schemas/lineSchema',
    };
    const nodeSchema = {
        // compare with the approach followed in repos and services
        name: 'Node',
        schema: '../persistence/schemas/nodeSchema',
    };
    const pathSchema = {
        // compare with the approach followed in repos and services
        name: 'Path',
        schema: '../persistence/schemas/pathSchema',
    };
    const driverSchema = {
        // compare with the approach followed in repos and services
        name: 'Driver',
        schema: '../persistence/schemas/driverSchema',
    };
    const vehicleTypeSchema = {
        // compare with the approach followed in repos and services
        name: 'VehicleType',
        schema: '../persistence/schemas/vehicleTypeSchema',
    };
    const tripResultSchema = {
        // compare with the approach followed in repos and services
        name: 'TripResult',
        schema: '../persistence/schemas/tripResultSchema',
    };
    const nodeController = {
        name: config_1.default.controller.node.name,
        path: config_1.default.controller.node.path
    };
    const lineController = {
        name: config_1.default.controller.line.name,
        path: config_1.default.controller.line.path
    };
    const driverController = {
        name: config_1.default.controller.driver.name,
        path: config_1.default.controller.driver.path
    };
    const vehicleTypeController = {
        name: config_1.default.controller.vehicleType.name,
        path: config_1.default.controller.vehicleType.path
    };
    const nodeRepo = {
        name: config_1.default.repos.node.name,
        path: config_1.default.repos.node.path
    };
    const lineRepo = {
        name: config_1.default.repos.line.name,
        path: config_1.default.repos.line.path
    };
    const userRepo = {
        name: config_1.default.repos.user.name,
        path: config_1.default.repos.user.path
    };
    const driverRepo = {
        name: config_1.default.repos.driver.name,
        path: config_1.default.repos.driver.path
    };
    const vehicleTypeRepo = {
        name: config_1.default.repos.vehicleType.name,
        path: config_1.default.repos.vehicleType.path
    };
    const nodeService = {
        name: config_1.default.services.node.name,
        path: config_1.default.services.node.path
    };
    const lineService = {
        name: config_1.default.services.line.name,
        path: config_1.default.services.line.path
    };
    const pathController = {
        name: config_1.default.controller.path.name,
        path: config_1.default.controller.path.path
    };
    const pathRepo = {
        name: config_1.default.repos.path.name,
        path: config_1.default.repos.path.path
    };
    const pathService = {
        name: config_1.default.services.path.name,
        path: config_1.default.services.path.path
    };
    const fileImportService = {
        name: config_1.default.services.fileImport.name,
        path: config_1.default.services.fileImport.path
    };
    const fileImportController = {
        name: config_1.default.controller.fileImport.name,
        path: config_1.default.controller.fileImport.path
    };
    const driverService = {
        name: config_1.default.services.driver.name,
        path: config_1.default.services.driver.path
    };
    const vehicleTypeService = {
        name: config_1.default.services.vehicleType.name,
        path: config_1.default.services.vehicleType.path
    };
    const TripResultService = {
        name: config_1.default.services.tripResult.name,
        path: config_1.default.services.tripResult.path
    };
    const TripResultController = {
        name: config_1.default.controller.tripResult.name,
        path: config_1.default.controller.tripResult.path
    };
    const TripResultRepo = {
        name: config_1.default.repos.tripResult.name,
        path: config_1.default.repos.tripResult.path
    };
    await dependencyInjector_1.default({
        mongoConnection,
        schemas: [
            userSchema,
            nodeSchema,
            pathSchema,
            driverSchema,
            vehicleTypeSchema,
            lineSchema,
            tripResultSchema
        ],
        controllers: [
            nodeController,
            pathController,
            lineController,
            driverController,
            vehicleTypeController,
            fileImportController,
            TripResultController
        ],
        repos: [
            nodeRepo,
            userRepo,
            pathRepo,
            driverRepo,
            vehicleTypeRepo,
            lineRepo,
            TripResultRepo
        ],
        services: [
            nodeService,
            pathService,
            driverService,
            vehicleTypeService,
            lineService,
            fileImportService,
            TripResultService
        ]
    });
    logger_1.default.info('✌️ Schemas, Controllers, Repositories, Services, etc. loaded');
    await express_1.default({ app: expressApp });
    logger_1.default.info('✌️ Express loaded');
};
//# sourceMappingURL=index.js.map