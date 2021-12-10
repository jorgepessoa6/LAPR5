"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const typedi_1 = require("typedi");
const fs_1 = __importDefault(require("fs"));
const config_1 = __importDefault(require("../config"));
const { DOMParser } = require('xmldom');
const xml2js = require('xml2js');
let FileImportService = class FileImportService {
    constructor(nodeServiceInstance, pathServiceInstance, lineServiceInstance, vehicleTypeServiceInstance) {
        this.nodeServiceInstance = nodeServiceInstance;
        this.pathServiceInstance = pathServiceInstance;
        this.lineServiceInstance = lineServiceInstance;
        this.vehicleTypeServiceInstance = vehicleTypeServiceInstance;
    }
    async importXML(xml) {
        let vehicleTypeServiceInstance = this.vehicleTypeServiceInstance;
        let lineServiceInstance = this.lineServiceInstance;
        let pathServiceInstance = this.pathServiceInstance;
        let nodeServiceInstance = this.nodeServiceInstance;
        fs_1.default.readFile(xml, 'utf8', async function (err, data) {
            if (err) {
                throw err;
            }
            const values = new DOMParser().parseFromString(data);
            let parser = new xml2js.Parser({
                explicitRoot: false,
                mergeAttrs: true,
                explicitArray: false,
                attrNameProcessors: [xml2js.processors.firstCharLowerCase],
                tagNameProcessors: [xml2js.processors.firstCharLowerCase],
                attrValueProcessors: [xml2js.processors.parseBooleans]
            });
            //import Nodes
            let nodes = values.getElementsByTagName('Node');
            for (let index = 0; index < nodes.length; index++) {
                parser.parseString(nodes[index], async (err, result) => {
                    try {
                        await nodeServiceInstance.createNode(result);
                    }
                    catch (e) {
                        //   throw new Error("Nos duplicados");
                    }
                });
            }
            //Import vehicletypes
            let vehicleTypes = values.getElementsByTagName('VehicleType');
            for (let index = 0; index < vehicleTypes.length; index++) {
                parser.parseString(vehicleTypes[index], async (err, result) => {
                    try {
                        await vehicleTypeServiceInstance.createVehicleType(result);
                    }
                    catch (e) {
                        throw new Error("vehicleTypes duplicados");
                    }
                });
            }
            //Import Paths
            let paths = values.getElementsByTagName('Path');
            for (let index = 0; index < paths.length; index++) {
                parser.parseString(paths[index], async (err, result) => {
                    try {
                        await pathServiceInstance.createPathImport(result);
                    }
                    catch (e) {
                        throw new Error("Paths duplicados");
                    }
                });
            }
            //Import lines
            let lines = values.getElementsByTagName('Line');
            for (let index = 0; index < lines.length; index++) {
                parser.parseString(lines[index], async (err, result) => {
                    try {
                        await lineServiceInstance.createLineImport(result);
                    }
                    catch (e) {
                        throw new Error("lines duplicados");
                    }
                });
            }
        });
    }
};
FileImportService = __decorate([
    typedi_1.Service(),
    __param(0, typedi_1.Inject(config_1.default.services.node.name)),
    __param(1, typedi_1.Inject(config_1.default.services.path.name)),
    __param(2, typedi_1.Inject(config_1.default.services.line.name)),
    __param(3, typedi_1.Inject(config_1.default.services.vehicleType.name)),
    __metadata("design:paramtypes", [Object, Object, Object, Object])
], FileImportService);
exports.default = FileImportService;
//# sourceMappingURL=fileImportService.js.map