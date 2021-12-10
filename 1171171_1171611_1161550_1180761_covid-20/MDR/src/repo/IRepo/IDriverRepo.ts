import { Repo } from "../../core/infra/Repo";
import { Driver } from "../../models/driver";
import { DriverID } from "../../models/driverID";

export default interface IDriverRepo extends Repo<Driver> {
  save(driver: Driver): Promise<Driver>;
  findByDomainId (DriverId: DriverID | string): Promise<Driver>;
  listByName(): Promise<Driver[]>;
}
