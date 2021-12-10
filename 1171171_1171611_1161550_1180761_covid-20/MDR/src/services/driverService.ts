import { Service, Inject, Container } from 'typedi';
import driverDTO from "../dto/Driver/driverDTO";

import DriverMapper from '../mappers/driverMapper';
import { Result } from '../core/logic/Result';
import  IDriverDTO  from '../dto/Driver/driverDTO';
import { Driver } from '../models/driver';
import config from '../config';
import  DriverRepo  from '../repo/driverRepo';
import  IDriverRepo  from '../repo/IRepo/IDriverRepo';
import IDriverService from './IServices/IDriverService';


@Service()
export default class DriverService implements IDriverService {
    constructor(
        @Inject(config.repos.driver.name) private driverRepo: IDriverRepo
    ) { }

    public async createDriver(driverDTO: driverDTO): Promise<Result<IDriverDTO>> {
        try {
            const driverOrError = await Driver.create(driverDTO);
            
            if (driverOrError.isFailure) {
                return Result.fail<IDriverDTO>(driverOrError.errorValue());
            }
            const driverResult = driverOrError.getValue();
            await this.driverRepo.save(driverResult);
            const driverDTOResult = DriverMapper.toDTO (driverResult) as IDriverDTO;
            //RETURN
            return Result.ok<IDriverDTO>(driverDTOResult);

        } catch (e) {
            throw e;
        }
    }


    public async listByName(): Promise<Driver[]> {
        try {
           const vehicleType = await this.driverRepo.listByName();
            return vehicleType;
           //return Result.ok<string[]>(nodes);
        } catch (e) {
            throw e;
        }
    }
}
