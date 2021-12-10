import { Repo } from "../../core/infra/Repo";
import { TripResult } from "../../models/tripResult";


export default interface ITripResultRepo extends Repo<TripResult> {
  save(result: TripResult): Promise<TripResult>;
  listarTripResults():Promise<TripResult[]>;
}
