import { Repo } from "../../core/infra/Repo";
import { VehicleType } from "../../models/vehicleType";
import { VehicleTypeID } from "../../models/vehicleTypeID";

export default interface IVehicleTypeRepo extends Repo<VehicleType> {
  save(viatura: VehicleType): Promise<VehicleType>;
  findByDomainId (VehicleTypeId: VehicleTypeID | string): Promise<VehicleType>;
  listByName(): Promise<VehicleType[]>;
}
