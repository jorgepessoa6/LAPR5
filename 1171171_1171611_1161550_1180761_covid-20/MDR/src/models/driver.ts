import mongoose from 'mongoose';
import { AggregateRoot } from '../core/domain/AggregateRoot';
import { Result } from '../core/logic/Result';
import { UniqueEntityID } from "../core/domain/UniqueEntityID";
import { DriverID } from './driverID';
import  IDriverDTO from '../dto/Driver/driverDTO';

interface DriverProps {
  //key: string;
  name: string;
  description: string;
}


export class Driver extends AggregateRoot<DriverProps>{

  get id(): UniqueEntityID {
      return this._id;
  }

  /*get driverID(): DriverID {
      return DriverID.create(this.id);
  }*/

  //get key(): string {
  //    return this.props.key;
  //}

  get name(): string {
      return this.props.name;
  }

  get description(): string {
      return this.props.description;
  }

  private constructor(props: DriverProps, id?: UniqueEntityID
  ) {
      super(props, id);
  }

  public static create(driverDTO: IDriverDTO, id?: UniqueEntityID): Result<Driver> {
     // const key = driverDTO.key;  
      const name = driverDTO.name;
      const description= driverDTO.description;


      //MELHORAR
      if (!!name === false || name.length === 0) {
          return Result.fail<Driver>('Must provide a driver name')
      } else {
          const driver = new Driver({
              //key: key,
              name: name,
              description: description,
             
          }, id);
          return Result.ok<Driver>(driver)
      }
  }
} 