import { Service, Inject } from 'typedi';
import DriverMapper from '../mappers/driverMapper';
import { Driver } from '../models/driver';
import IDriverRepo from './IRepo/IDriverRepo';
import { Document, Model } from 'mongoose';
import { DriverID } from '../models/driverID';
import { IDriverPersistence } from '../dataschema/IDriverPersistence';


@Service()
export default class DriverRepo implements IDriverRepo {
  private models: any;

  constructor(
    @Inject('Driver') private driverSchema : Model<IDriverPersistence & Document>,
  ) {}

  private createBaseQuery (): any {
    return {
      where: {},
    }
  }

  public async exists (driverID: DriverID | string): Promise<boolean> {

    const idX = driverID instanceof DriverID ? (<DriverID>driverID).id.toValue() : driverID;

    const query = { domainId: idX}; 
    const driverDocument = await this.driverSchema.findOne( query );

    return !!driverDocument === true;
  }

  public async save (driver: Driver): Promise<Driver> {
    const query = { domainId: driver.id.toString()}; 

    const driverDocument = await this.driverSchema.findOne( query );

    try {
      if (driverDocument === null ) {
        const rawDriver: any = DriverMapper.toPersistence(driver);

        const driverCreated = await this.driverSchema.create(rawDriver);

        return DriverMapper.toDomain(driverCreated);
      } else {
        driverDocument.name = driver.name;
        await driverDocument.save();

        return driver;
      }
    } catch (err) {
      throw err;
    }
  }

  public async findByDomainId (driverID: DriverID | string): Promise<Driver> {
    const query = { domainId: driverID};
    const driverRecord = await this.driverSchema.findOne( query );

    if( driverRecord != null) {
      return DriverMapper.toDomain(driverRecord);
    }
    else
      return null;
  }

  public async listByName(): Promise<Driver[]> {
    return new Promise<Driver[]>((resolve, reject) => {
      this.driverSchema.aggregate([
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
      ], (error: any, result: Driver[]) => {
        if (error) reject(error);
        else {
          console.log(result);
          let driver: Driver[] = [];
          result.forEach(function (element: Driver) {
            driver.push(element);
          });
          resolve(driver);
        }
      });
    });
  }
}