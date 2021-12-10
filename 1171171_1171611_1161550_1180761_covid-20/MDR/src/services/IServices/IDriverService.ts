import { Result } from "../../core/logic/Result";
import IDriverDTO from "../../dto/Driver/driverDTO";
import  { Driver } from "../../models/driver";

export default interface IDriverService  {
  createDriver(driverDTO: IDriverDTO): Promise<Result<IDriverDTO>>;
  //updateDriver(driverDTO: IDriverDTO): Promise<Result<IDriverDTO>>;
  listByName(): Promise<Driver[]>;
}
