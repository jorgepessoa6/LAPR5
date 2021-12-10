import { Result } from "../../core/logic/Result";
import IVehicleTypeDTO from "../../dto/VehicleType/vehicleTypeDTO";
import { VehicleType } from "../../models/vehicleType";

export default interface IVehicleTypeService  {
  createVehicleType(vehicleTypeDTO: IVehicleTypeDTO): Promise<Result<IVehicleTypeDTO>>;
  //updateVehicleType(tripulanteDTO: IVehicleTypeDTO): Promise<Result<IVehicleTypeDTO>>;
 listByName(): Promise<VehicleType[]>;
}