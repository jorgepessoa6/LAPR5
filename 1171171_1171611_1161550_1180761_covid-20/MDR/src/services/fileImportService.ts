import { Service, Inject, Container } from 'typedi';
import fs from 'fs';
import INodeDTO from '../dto/Node/nodeDTO';
import config from '../config';
const { DOMParser } = require('xmldom');
const xml2js = require('xml2js');
import INodeService from './IServices/INodeService';
import ILineService from './IServices/ILineService';
import IPathService from './IServices/IPathService';
import IVehicleTypeService from './IServices/IVehicleTypeService';
import IVehicleTypeDTO from '../dto/VehicleType/vehicleTypeDTO';
import VehicleTypeService from './vehicleTypeService';
import IFileImportService from './IServices/IFileImportService';
import IPathDTO from '../dto/Path/pathDTO';
import ILineDTO from '../dto/Line/lineDTO';


@Service()
export default class FileImportService implements IFileImportService {
    constructor(
        @Inject(config.services.node.name) private nodeServiceInstance: INodeService,
        @Inject(config.services.path.name) private pathServiceInstance: IPathService,
        @Inject(config.services.line.name) private lineServiceInstance: ILineService,
        @Inject(config.services.vehicleType.name) private vehicleTypeServiceInstance: IVehicleTypeService
    ) { }

    public async importXML(xml){
        let vehicleTypeServiceInstance = this.vehicleTypeServiceInstance;
        let lineServiceInstance = this.lineServiceInstance;
        let pathServiceInstance = this.pathServiceInstance;
        let nodeServiceInstance = this.nodeServiceInstance;
        
        fs.readFile(xml, 'utf8', async function (err, data) {
            if (err) {
                throw err;
            }
            const values = new DOMParser().parseFromString(data);
            let parser = new xml2js.Parser(
                {
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
                        await nodeServiceInstance.createNode(result as INodeDTO);
                    } catch (e) {
                     //   throw new Error("Nos duplicados");
                    }
                });
            }
            //Import vehicletypes
            let vehicleTypes = values.getElementsByTagName('VehicleType');
            for (let index = 0; index < vehicleTypes.length; index++) {
                parser.parseString(vehicleTypes[index], async (err, result) => {
                    try {
                        await vehicleTypeServiceInstance.createVehicleType(result as IVehicleTypeDTO);
                    } catch (e) {
                        throw new Error("vehicleTypes duplicados");
                    }
                });
            }
            //Import Paths
            let paths = values.getElementsByTagName('Path');
            for (let index = 0; index < paths.length; index++) {
                parser.parseString(paths[index], async (err, result) => {

                    try {
                        await pathServiceInstance.createPathImport(result as IPathDTO);
                    } catch (e) {
                        throw new Error("Paths duplicados");
                    }
                });

            }
            //Import lines
            let lines = values.getElementsByTagName('Line');
            for (let index = 0; index < lines.length; index++) {
                parser.parseString(lines[index], async (err, result) => {
                    try {
                        await lineServiceInstance.createLineImport(result as ILineDTO);
                    } catch (e) {
                        throw new Error("lines duplicados");
                    }

                });
            }
        });
    }
}
