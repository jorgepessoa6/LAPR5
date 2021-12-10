"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
// Set the NODE_ENV to 'development' by default
process.env.NODE_ENV = process.env.NODE_ENV || 'development';
const envFound = dotenv_1.default.config();
if (envFound.error) {
    // This error should crash whole process
    throw new Error(" Couldn't find .env file ");
}
exports.default = {
    /**
     * Your favorite port
     */
    port: parseInt(process.env.PORT, 10),
    /**
     * That long string from mlab
     */
    databaseURL: process.env.MONGODB_URI,
    /**
     * Your secret sauce
     */
    jwtSecret: process.env.JWT_SECRET,
    /**
     * Used by winston logger
     */
    logs: {
        level: process.env.LOG_LEVEL || 'silly',
    },
    /**
     * Agendash config
     */
    agendash: {
        user: 'agendash',
        password: '123456',
    },
    /**
     * API configs
     */
    api: {
        prefix: '/api',
    },
    controller: {
        node: {
            name: 'NodeController',
            path: '../controller/nodeController',
        },
        tripResult: {
            name: 'TripResultController',
            path: '../controller/tripResultController',
        },
        role: {
            name: 'RoleController',
            path: '../controllers/roleController',
        },
        line: {
            name: 'LineController',
            path: '../controller/lineController',
        },
        path: {
            name: 'PathController',
            path: '../controller/pathController',
        },
        driver: {
            name: 'DriverController',
            path: '../controller/driverController',
        },
        vehicleType: {
            name: 'VehicleTypeController',
            path: '../controller/vehicleTypeController',
        },
        fileImport: {
            name: 'FileImportController',
            path: '../controller/fileImportController',
        }
    },
    repos: {
        node: {
            name: 'NodeRepo',
            path: '../repo/nodeRepo',
        },
        tripResult: {
            name: 'TripResultRepo',
            path: '../repo/tripResultRepo',
        },
        user: {
            name: 'UserRepo',
            path: '../repo/userRepo',
        },
        role: {
            name: 'RoleRepo',
            path: '../repo/roleRepo',
        },
        line: {
            name: 'LineRepo',
            path: '../repo/lineRepo',
        },
        driver: {
            name: 'DriverRepo',
            path: '../repo/driverRepo',
        },
        path: {
            name: 'PathRepo',
            path: '../repo/pathRepo',
        },
        vehicleType: {
            name: 'VehicleTypeRepo',
            path: '../repo/vehicleTypeRepo',
        },
    },
    services: {
        node: {
            name: 'NodeService',
            path: '../services/nodeService',
        },
        tripResult: {
            name: 'TripResultService',
            path: '../services/tripResultService',
        },
        role: {
            name: 'RoleService',
            path: '../services/roleService',
        },
        line: {
            name: 'LineService',
            path: '../services/lineService',
        },
        path: {
            name: 'PathService',
            path: '../services/pathService',
        },
        driver: {
            name: 'DriverService',
            path: '../services/driverService',
        },
        vehicleType: {
            name: 'VehicleTypeService',
            path: '../services/vehicleTypeService',
        },
        fileImport: {
            name: 'FileImportService',
            path: '../services/fileImportService',
        }
    },
};
//# sourceMappingURL=index.js.map