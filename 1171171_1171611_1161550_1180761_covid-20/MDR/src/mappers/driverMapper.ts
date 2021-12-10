import { Document, Model } from 'mongoose';
import { UniqueEntityID } from '../core/domain/UniqueEntityID';
import { Mapper } from '../core/infra/Mapper';
import { IDriverPersistence } from '../dataschema/IDriverPersistence';
import IDriverDTO  from '../dto/Driver/driverDTO';
import { Driver } from '../models/driver';
import { DriverID } from '../models/driverID';

export default class DriverMapper extends Mapper<Driver>{
    public static toDTO(driver: Driver): IDriverDTO {
        return {
           // key: driver.key,
            name: driver.name,
            description: driver.description
        } as IDriverDTO;
    }

    public static toDomain(driver: any | Model<IDriverPersistence & Document>): Driver {
        const driverOrError = Driver.create (
            driver,
            new UniqueEntityID(driver.domainID));

        driverOrError.isFailure ? console.log(driverOrError) : '';

        return driverOrError.isSuccess ? driverOrError.getValue(): null;  
    }

    public static toPersistence(driver: Driver): any {
        return {
            domainID: driver.id.toString(),
            //key: driver.key,
            name: driver.name,
            description: driver.description
        }
    }
}