import mongoose from 'mongoose';
import { AggregateRoot } from '../core/domain/AggregateRoot';
import { Result } from '../core/logic/Result';
import { UniqueEntityID } from "../core/domain/UniqueEntityID";
import { VehicleTypeID } from './vehicleTypeID';
import  IVehicleTypeDTO from '../dto/VehicleType/vehicleTypeDTO';

interface VehicleTypeProps {
    //key: string;
    name: string;
    autonomy: number; 
    cost: number;
    averageSpeed: number;
    energySource: number;
    consumption: number;
    emissions: number;
    ParametersValues:  Array<any>;
    Vehicles: Array<any>;
}


export class VehicleType extends AggregateRoot<VehicleTypeProps>{

  get id(): UniqueEntityID {
      return this._id;
  }
/*
  get vehicleID(): VehicleTypeID {
      return VehicleTypeID.create(this.id);
  }*/

 /* get key(): string {
      return this.props.key;
  }*/

  get name(): string {
      return this.props.name;
  }

  get autonomy(): number { 
      return this.props.autonomy;
  }

  get cost(): number {
    return this.props.cost;
  }

  get averageSpeed(): number {
    return this.props.averageSpeed;
  }

  get energySource(): number {
    return this.props.energySource;
  }

  get consumption(): number {
    return this.props.consumption;
  }

  get emissions(): number {
    return this.props.emissions;
  }

  get ParametersValues():  Array<any>{
    return this.props.ParametersValues;
  }
  get Vehicles():  Array<any>{
    return this.props.Vehicles;
  }

  private constructor(props: VehicleTypeProps, id?: UniqueEntityID
  ) {
      super(props, id);
  }

  public static create(vehicleTypeDTO: IVehicleTypeDTO, id?: UniqueEntityID): Result<VehicleType> {
      //const key = vehicleTypeDTO.key;  
      const name = vehicleTypeDTO.name;
      const autonomy = vehicleTypeDTO.autonomy;
      const cost = vehicleTypeDTO.cost;
      const averageSpeed= vehicleTypeDTO.averageSpeed;
      const energySource = vehicleTypeDTO.energySource;
      const consumption = vehicleTypeDTO.consumption;
      const emissions = vehicleTypeDTO.emissions;
      const ParametersValues = vehicleTypeDTO.ParametersValues;
      const Vehicles = vehicleTypeDTO.Vehicles;


      //MELHORAR
      if (!!name === false || name.length === 0) {
          return Result.fail<VehicleType>('Must provide a vehicleType name')
      } else {
          const vehicleType = new VehicleType({
              //key: key,
              name: name,
              autonomy: autonomy,
              cost: cost,
              averageSpeed: averageSpeed,
              energySource: energySource,
              consumption: consumption,
              emissions: emissions,
              ParametersValues: ParametersValues,
              Vehicles: Vehicles,
             
          }, id);
          return Result.ok<VehicleType>(vehicleType)
      }
  }
} 