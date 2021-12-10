import { Driver } from '../../models/driver';
import { LinePath } from '../../models/linePath';
import { VehicleType } from '../../models/vehicleType';


export default interface ILineDTO {
  key: string;
  name: string;
  firstNode: string;
  lastNode: string;
  color: string;
  linePaths: LinePath[];
  allowedDrivers: Array<Driver>;
  disallowedDrivers: Array<Driver>;
  allowedVehicles: Array<VehicleType>;
  disallowedVehicles: Array<VehicleType>;
}
