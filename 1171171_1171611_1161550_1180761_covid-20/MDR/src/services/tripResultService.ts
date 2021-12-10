import { Service, Inject, Container } from 'typedi';
import { Result } from '../core/logic/Result';
import config from '../config';
import ITripResultService from './IServices/ITripResultService';
import ITripResultDTO from '../dto/TripResult/tripResultDTO';
import ITripResultRepo from '../repo/IRepo/ITripResultRepo';
import { TripResult } from '../models/tripResult';
import { TripResultMapper } from '../mappers/tripResultMapper';



@Service()
export default class TripResultService implements ITripResultService {
    constructor(
        @Inject(config.repos.tripResult.name) private resultRepo: ITripResultRepo
    ) { }

    public async createResult(resultDTO: ITripResultDTO): Promise<Result<ITripResultDTO>> {
        try {
            const resultOrError = await TripResult.create(resultDTO);
            if (resultOrError.isFailure) {
                return Result.fail<ITripResultDTO>(resultOrError.errorValue());
            }
            const resultResult = resultOrError.getValue();
            await this.resultRepo.save(resultResult);
            const resultDTOResult = TripResultMapper.toDTO(resultResult) as ITripResultDTO;
            return Result.ok<ITripResultDTO>(resultDTOResult);

        } catch (e) {
            throw e;
        }
    }

    public async listarTripResults(): Promise<TripResult[]> {
        try {
           const tripResults = await this.resultRepo.listarTripResults();
            return tripResults;
           //return Result.ok<string[]>(nodes);
        } catch (e) {
            throw e;
        }
    }
}