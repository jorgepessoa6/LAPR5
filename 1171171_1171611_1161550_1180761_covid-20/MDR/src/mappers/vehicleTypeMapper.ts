import { Document, Model } from 'mongoose';
import driver from '../api/routes/driver';
import { UniqueEntityID } from '../core/domain/UniqueEntityID';
import { Mapper } from '../core/infra/Mapper';
import { IVehicleTypePersistence } from '../dataschema/IVehicleTypePersistence';
import IVehicleTypeDTO  from '../dto/VehicleType/vehicleTypeDTO';
import { VehicleType } from '../models/vehicleType';
import { VehicleTypeID } from '../models/vehicleTypeID';

export default class VehicleTypeMapper extends Mapper<VehicleType>{
    public static toDTO(vehicleType: VehicleType): IVehicleTypeDTO {
        return {
            //key: vehicleType.key,
            name: vehicleType.name,
            autonomy: vehicleType.autonomy,
            cost: vehicleType.cost,
            averageSpeed: vehicleType.averageSpeed,
            energySource: vehicleType.energySource,
            consumption: vehicleType.consumption,
            emissions: vehicleType.emissions
            
        } as IVehicleTypeDTO;
    }

    public static toDomain(vehicleType: any | Model<IVehicleTypePersistence & Document>): VehicleType {
        const vehicleTypeOrError = VehicleType.create (
            vehicleType,
            new UniqueEntityID(vehicleType.domainID));

        vehicleTypeOrError.isFailure ? console.log(vehicleTypeOrError) : '';

        return vehicleTypeOrError.isSuccess ? vehicleTypeOrError.getValue(): null;  
    }

    public static toPersistence(vehicleType: VehicleType): any {
        return {
            domainID: vehicleType.id.toString(),
            //key: vehicleType.key,
            name: vehicleType.name,
            autonomy: vehicleType.autonomy,
            cost: vehicleType.cost,
            averageSpeed: vehicleType.averageSpeed,
            energySource: vehicleType.energySource,
            consumption: vehicleType.consumption,
            emissions: vehicleType.emissions
        }
    }
}