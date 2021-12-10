import { Result } from "../../core/logic/Result";
import ITripResultDTO from "../../dto/TripResult/tripResultDTO";
import { TripResult } from "../../models/tripResult";

export default interface ITripResultService  {
  createResult(resultDTO: ITripResultDTO): Promise<Result<ITripResultDTO>>;
  listarTripResults():  Promise<TripResult[]>;
}
