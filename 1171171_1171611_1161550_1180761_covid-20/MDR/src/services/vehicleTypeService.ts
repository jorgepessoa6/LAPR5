import { Service, Inject, Container } from 'typedi';
import vehicleTypeDTO from "../dto/VehicleType/vehicleTypeDTO";
import VehicleTypeMapper from '../mappers/vehicleTypeMapper';
import { Result } from '../core/logic/Result';
import  IVehicleTypeDTO  from '../dto/VehicleType/vehicleTypeDTO';
import { VehicleType } from '../models/vehicleType';
import config from '../config';
import  VehicleTypeRepo  from '../repo/vehicleTypeRepo';

import  IVehicleTypeRepo  from '../repo/IRepo/IVehicleTypeRepo';
import IVehicleTypeService from './IServices/IVehicleTypeService';


@Service()
export default class VehicleTypeService implements IVehicleTypeService {
    constructor(
        @Inject(config.repos.vehicleType.name) private vehicleTypeRepo: IVehicleTypeRepo
    ) { }

    public async createVehicleType(vehicleTypeDTO: vehicleTypeDTO): Promise<Result<IVehicleTypeDTO>> {
        try {
            const vehicleTypeOrError = await VehicleType.create(vehicleTypeDTO);
            if (vehicleTypeOrError.isFailure) {
                return Result.fail<IVehicleTypeDTO>(vehicleTypeOrError.errorValue());
            }
            const vehicleTypeResult = vehicleTypeOrError.getValue();
            await this.vehicleTypeRepo.save(vehicleTypeResult);
            const vehicleTypeDTOResult = VehicleTypeMapper.toDTO (vehicleTypeResult) as IVehicleTypeDTO;
            //RETURN
            return Result.ok<IVehicleTypeDTO>(vehicleTypeDTOResult);

        } catch (e) {
            throw e;
        }
    }

    
    public async listByName(): Promise<VehicleType[]> {
        try {
           const vehicleType = await this.vehicleTypeRepo.listByName();
            return vehicleType;
           //return Result.ok<string[]>(nodes);
        } catch (e) {
            throw e;
        }
    }

}
