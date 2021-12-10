import { Document, Model } from 'mongoose';
import { Service, Inject } from 'typedi';
import { ITripResultPersistence } from '../dataschema/ITripResultPersistance';
import { TripResultMapper } from '../mappers/tripResultMapper';
import { TripResult } from '../models/tripResult';
import { TripResultID } from '../models/tripResultID';
import ITripResultRepo from './IRepo/ITripResultRepo';


@Service()
export default class TripResultRepo implements ITripResultRepo {
  private models: any;

  constructor(
    @Inject('TripResult') private tripResultSchema : Model<ITripResultPersistence & Document>,
  ) {}

  private createBaseQuery (): any {
    return {
      where: {},
    }
  }

  public async exists (tripResultID: TripResultID | string): Promise<boolean> {

    const idX = tripResultID instanceof TripResultID ? (<TripResultID>tripResultID).id.toValue() : tripResultID;

    const query = { id: idX}; 
    const tripResultDocument = await this.tripResultSchema.findOne( query );

    return !!tripResultDocument === true;
  }

  public async save (tripResult: TripResult): Promise<TripResult> {
    const query = { id: tripResult.id.toString()}; 

    const tripResultDocument = await this.tripResultSchema.findOne( query );

    try {
      if (tripResultDocument === null ) {
        const rawTripResult: any = TripResultMapper.toPersistence(tripResult);

        const tripResultCreated = await this.tripResultSchema.create(rawTripResult);

        const returnTripResult = TripResultMapper.toDomain(tripResultCreated);

        return returnTripResult;
      } else {
        tripResultDocument.id = tripResult.id;
        await tripResultDocument.save();

        return tripResult;
      }
    } catch (err) {
      throw err;
    }
  }

  public async listarTripResults(): Promise<TripResult[]> {
    return new Promise<TripResult[]>((resolve, reject) => {
      this.tripResultSchema.aggregate([
        /*  {
           "$group":
           {
             _id: "$name",
             total: { "$sum": "$name" } 
           }
         }, */
        {
          "$sort":
            { time: 1 }
        },
      ], (error: any, result: TripResult[]) => {
        if (error) reject(error);
        else {
          console.log(result);
          let nodes: TripResult[] = [];
          result.forEach(function (element: TripResult) {
            nodes.push(element);
          });
          resolve(nodes);
        }
      });
    });
  }
}