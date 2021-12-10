import { IntegerDataType } from "sequelize/types";

export interface IVehicleType{
    //key: string;
    name: string;
    autonomy: number; //int positivo
    cost: number; //monetário não negativo
    averageSpeed: number; //int positivo
    energySource: number; // valores fixos
    /*
    EnergySource - 23   20       50           75           1
    é igual a -Gasoleo  Gpl  Hidrogenio    Eletrico  Gasolina */
    consumption: number; // decimal com 3 casas
    emissions: number;
    ParametersValues: Array<any>;
    Vehicles:Array<any>;
}
export default interface IVehicleTypeDTO{
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