import { Document, Model } from 'mongoose';
import { UniqueEntityID } from '../core/domain/UniqueEntityID';
import { Mapper } from '../core/infra/Mapper';
import { ITripResultPersistence } from '../dataschema/ITripResultPersistance';
import  ITripResultDTO  from '../dto/TripResult/tripResultDTO';
import { TripResult } from '../models/tripResult';
import { TripResultID } from '../models/tripResultID';


export class TripResultMapper extends Mapper<TripResult>{
    public static toDTO(tripResult: TripResult): ITripResultDTO {
        return {
            time : tripResult.time,
            noI : tripResult.noI,
            noF : tripResult.noF,
            caminho : tripResult.caminho,
            finalTime : tripResult.finalTime
        } as ITripResultDTO;
    }

    public static toDomain(tripResult: any | Model<ITripResultPersistence & Document>): TripResult {
    const tripResultOrError = TripResult.create(
        tripResult,
        new UniqueEntityID(tripResult.domainID));

        tripResultOrError.isFailure ? console.log(tripResultOrError) : '';

    return tripResultOrError.isSuccess ? tripResultOrError.getValue() : null;
}

    public static toPersistence(tripResult: TripResult): any {
    return {
        domainId: tripResult.id.toString(),
        time : tripResult.time,
        noI : tripResult.noI,
        noF : tripResult.noF,
        caminho : tripResult.caminho,
        finalTime : tripResult.finalTime
    }
}
}