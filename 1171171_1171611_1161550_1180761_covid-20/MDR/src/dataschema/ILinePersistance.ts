import { Driver } from '../models/driver';
import { LinePath } from '../models/linePath';
import { RGB } from '../models/RGB';
import { VehicleType } from '../models/vehicleType';

export interface ILinePersistence {
  key: string;
  name: string;
  firstNode: string;
  lastNode: string;
  color: RGB;
  linePath: Array<LinePath>;
  allowedDrivers: Array<Driver>;
  disallowedDrivers: Array<Driver>;
  allowedVehicles: Array<VehicleType>;
  disallowedVehicles: Array<VehicleType>;
}
