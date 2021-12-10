import { Service, Inject } from 'typedi';
import VehicleTypeMapper from '../mappers/vehicleTypeMapper';
import { VehicleType } from '../models/vehicleType';
import IVehicleTypeRepo from './IRepo/IVehicleTypeRepo';
import { Document, Model } from 'mongoose';
import { VehicleTypeID } from '../models/vehicleTypeID';
import { IVehicleTypePersistence } from '../dataschema/IVehicleTypePersistence';


@Service()
export default class VehicleTypeRepo implements IVehicleTypeRepo {
  private models: any;

  constructor(
    @Inject('VehicleType') private vehicleTypeSchema : Model<IVehicleTypePersistence & Document>,
  ) {}

  private createBaseQuery (): any {
    return {
      where: {},
    }
  }

  public async exists (vehicleTypeID: VehicleTypeID | string): Promise<boolean> {

    const idX = vehicleTypeID instanceof VehicleTypeID ? (<VehicleTypeID>vehicleTypeID).id.toValue() : vehicleTypeID;

    const query = { domainId: idX}; 
    const vehicleTypeDocument = await this.vehicleTypeSchema.findOne( query );

    return !!vehicleTypeDocument === true;
  }

  public async save (vehicleType: VehicleType): Promise<VehicleType> {
    const query = { domainId: vehicleType.id.toString()}; 

    const vehicleTypeDocument = await this.vehicleTypeSchema.findOne( query );

    try {
      if (vehicleTypeDocument === null ) {
        const rawVehicleType: any = VehicleTypeMapper.toPersistence(vehicleType);

        const vehicleTypeCreated = await this.vehicleTypeSchema.create(rawVehicleType);

        return VehicleTypeMapper.toDomain(vehicleTypeCreated);
      } else {
        vehicleTypeDocument.name = vehicleType.name;
        await vehicleTypeDocument.save();

        return vehicleType;
      }
    } catch (err) {
      throw err;
    }
  }

  public async findByDomainId (vehicleTypeID: VehicleTypeID | string): Promise<VehicleType> {
    const query = { domainId: vehicleTypeID};
    const vehicleTypeRecord = await this.vehicleTypeSchema.findOne( query );

    if( vehicleTypeRecord != null) {
      return VehicleTypeMapper.toDomain(vehicleTypeRecord);
    }
    else
      return null;
  }

  public async listByName(): Promise<VehicleType[]> {
    return new Promise<VehicleType[]>((resolve, reject) => {
      this.vehicleTypeSchema.aggregate([
        /*  {
           "$group":
           {
             _id: "$name",
             total: { "$sum": "$name" } 
           }
         }, */
        {
          "$sort":
            { name: 1 }
        },
      ], (error: any, result: VehicleType[]) => {
        if (error) reject(error);
        else {
          console.log(result);
          let vehicleType: VehicleType[] = [];
          result.forEach(function (element: VehicleType) {
            vehicleType.push(element);
          });
          resolve(vehicleType);
        }
      });
    });
  }
}