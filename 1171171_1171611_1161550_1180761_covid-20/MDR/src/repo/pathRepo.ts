import { Service, Inject } from 'typedi';
import {PathMapper} from '../mappers/pathMapper';
import { Path } from '../models/path';
import IPathRepo from './IRepo/IPathRepo';
import { Document, Model } from 'mongoose';
import { PathID } from '../models/pathID';
import { IPathPersistence } from '../dataschema/IPathPersistance';


@Service()
export default class PathRepo implements IPathRepo {
  private models: any;

  constructor(
    @Inject('Path') private pathSchema : Model<IPathPersistence & Document>,
  ) {}

  private createBaseQuery (): any {
    return {
      where: {},
    }
  }

  public async exists (pathID: PathID | string): Promise<boolean> {

    const idX = pathID instanceof PathID ? (<PathID>pathID).id.toValue() : pathID;

    const query = { id: idX}; 
    const pathDocument = await this.pathSchema.findOne( query );

    return !!pathDocument === true;
  }

  public async save (path: Path): Promise<Path> {
    const query = { id: path.id.toString()}; 

    const pathDocument = await this.pathSchema.findOne( query );

    try {
      if (pathDocument === null ) {
        const rawPath: any = PathMapper.toPersistence(path);

        const pathCreated = await this.pathSchema.create(rawPath);

        const returnPath = PathMapper.toDomain(pathCreated);

        return returnPath;
      } else {
        pathDocument.id = path.id;
        await pathDocument.save();

        return path;
      }
    } catch (err) {
      throw err;
    }
  }

  public async findByDomainId (pathID: PathID | string): Promise<Path> {
    const query = { id: pathID};
    const pathRecord = await this.pathSchema.findOne( query );

    if( pathRecord != null) {
      return PathMapper.toDomain(pathRecord);
    }
    else
      return null;
  }

  public async findByKey(keyReq: string): Promise<Path> {
    return new Promise<Path>((resolve, reject) => {
      this.pathSchema.aggregate([

        {"$match" : {key : keyReq}}]
      , (error: any, result: Path) => {
        if (error) reject(error);
        else {
          resolve(result);
        }
      });
    });
  }


  public async listByName(): Promise<Path[]> {
    return new Promise<Path[]>((resolve, reject) => {
      this.pathSchema.aggregate(
        [
          /*  {
          "$group":
          {
            _id: "$name",
            total: { "$sum": "$name" } 
          }
        }, */
          {
            "$sort": { key: 1 },
          },
        ],
        (error: any, result: Path[]) => {
          if (error) reject(error);
          else {
            console.log(result);
            let nodes: Path[] = [];
            result.forEach(function (element: Path) {
              nodes.push(element);
            });
            resolve(nodes);
          }
        },
      );
    });
  }
}