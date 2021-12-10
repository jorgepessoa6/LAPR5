import { IntegerDataType } from "sequelize/types";

export interface IVehicleTypePersistence {
    name: string;
    autonomy: number; //integerdatatype
    cost: number;
    averageSpeed: number;
    energySource: number;
    consumption: number;
    emissions: number;
  }