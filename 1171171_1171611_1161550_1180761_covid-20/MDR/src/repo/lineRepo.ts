import ILineRepo from './IRepo/ILineRepo';
import { Document, Model } from 'mongoose';
import { ILinePersistence } from '../dataschema/ILinePersistance';
import { Inject, Service } from 'typedi';
import { Line } from '../models/line';
import { LineID } from '../models/lineID';
import { LineMapper } from '../mappers/lineMapper';


@Service('LineRepo')
export default class LineRepo implements ILineRepo {
  private models: any;

  constructor(@Inject('Line') private lineSchema: Model<ILinePersistence & Document>) {}

  private createBaseQuery(): any {
    return {
      where: {},
    };
  }

  public async exists(lineID: LineID | string): Promise<boolean> {
    const idX = lineID instanceof LineID ? (<LineID>lineID).id.toValue() : lineID;

    const query = { domainId: idX };
    const lineDocument = await this.lineSchema.findOne(query);

    return !!lineDocument === true;
  }

  public async save(line: Line): Promise<Line> {
    const query = { domainId: line.id };
    const lineDocument = await this.lineSchema.findOne(query);
    try {
      if (lineDocument === null) {
        const rawLine: any = LineMapper.toPersistence(line);
        const lineCreated = await this.lineSchema.create(rawLine);
        return LineMapper.toDomain(lineCreated);
      } else {
        lineDocument.name = line.name;
        await lineDocument.save();

        return line;
      }
    } catch (err) {
      throw err;
    }
  }

  public async update(line: Line): Promise<Line> {
    const query = { key: line.key };

    const lineDocument = await this.lineSchema.findOne(query);

    try {
      if (lineDocument === null) {
        const rawLine: any = LineMapper.toPersistence(line);

        const lineCreated = await this.lineSchema.create(rawLine);

        return LineMapper.toDomain(lineCreated);
      } else {
        lineDocument.name = line.name;
        lineDocument.linePath = [];
        line.linePath.forEach(element => {
          lineDocument.linePath.push(element); 
        });
        await lineDocument.save();

        return line;
      }
    } catch (err) {
      throw err;
    }
  }

  public async findByDomainId(lineID: LineID | string): Promise<Line> {
    const query = { domainId: lineID };
    const lineRecord = await this.lineSchema.findOne(query);

    if (lineRecord != null) {
      return LineMapper.toDomain(lineRecord);
    } else return null;
  }


  public async findByKey(keyReq: string): Promise<Line> {
    return new Promise<Line>((resolve, reject) => {
      this.lineSchema.aggregate([

        {"$match" : {name : keyReq}}]
      , (error: any, result: Line) => {
        if (error) reject(error);
        else {
          resolve(result);
        }
      });
    });
  }
  public async listByName(): Promise<Line[]> {
    return new Promise<Line[]>((resolve, reject) => {
      this.lineSchema.aggregate(
        [
          /*  {
          "$group":
          {
            _id: "$name",
            total: { "$sum": "$name" } 
          }
        }, */
          {
            "$sort": { name: 1 },
          },
        ],
        (error: any, result: Line[]) => {
          if (error) reject(error);
          else {
            console.log(result);
            let nodes: Line[] = [];
            result.forEach(function (element: Line) {
              nodes.push(element);
            });
            resolve(nodes);
          }
        },
      );
    });
  }
  public async listByCode(): Promise<Line[]> {
    return new Promise<Line[]>((resolve, reject) => {
      this.lineSchema.aggregate(
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
        (error: any, result: Line[]) => {
          if (error) reject(error);
          else {
            console.log(result);
            let nodes: Line[] = [];
            result.forEach(function (element: Line) {
              nodes.push(element);
            });
            resolve(nodes);
          }
        },
      );
    });
  }

  public async filterByName(keyReq: string): Promise<Line[]> {
    console.log(keyReq);
    return new Promise<Line[]>((resolve, reject) => {
      this.lineSchema.find(
        { name: { $regex: '^' + keyReq } },

        (error: any, result: Line[]) => {
          if (error) reject(error);
          else {
            console.log(result);
            let nodes: Line[] = [];
            result.forEach(function (element: Line) {
              nodes.push(element);
            });
            resolve(nodes);
          }
        },
      );
    });
  }
  public async filterCode(keyReq: string): Promise<Line[]> {
    return new Promise<Line[]>((resolve, reject) => {
      this.lineSchema.find({key: { $regex: '^' + keyReq } }, (error: any, result: Line[]) => {
        if (error) reject(error);
        else {
          let nodes: Line[] = [];
          result.forEach(function (element: Line) {
            nodes.push(element);
          });
          resolve(nodes);
        }
      });
    });
  }
}
