import { Request, Response, NextFunction } from 'express';
import { Inject } from 'typedi';
import config from '../config';
import FileImportService from '../services/fileImportService';
import ILineService from '../services/IServices/ILineService';
import INodeService from '../services/IServices/INodeService';
import IPathService from '../services/IServices/IPathService';
import IVehicleTypeService from '../services/IServices/IVehicleTypeService';

const { DOMParser } = require('xmldom');
const xml2js = require('xml2js');
import fs from 'fs';
import IVehicleTypeDTO from '../dto/VehicleType/vehicleTypeDTO';
import IFileImportController from './IController/IFileImportController';


export default class FileImportController implements IFileImportController {
    constructor(
        @Inject(config.services.fileImport.name) private fileImportServiceInstance: FileImportService,
    ) { }

    public async importFile(req: any, res: Response, next: NextFunction) {
        try {
            if (req.files) {
                const file = req.files.xml.tempFilePath;
                await this.fileImportServiceInstance.importXML(file);
                res.status(201).send('Sucesso');
            } else {
                res.status(400).send('Operação Não Sucedida - Erro no ficehiro');
            }
        } catch (e) {
            throw new Error("Erro");
        }
    }
}