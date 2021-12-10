import { Document, Model } from 'mongoose';
import { ILinePersistence } from '../dataschema/ILinePersistance';
import { Line } from '../models/line';
import { Mapper } from '../core/infra/Mapper';
import { UniqueEntityID } from '../core/domain/UniqueEntityID';

export class LineMapper extends Mapper<Line> {
  public static toDTO(line: Line): Line {
    return {
      key: line.key,
      name: line.name,
      firstNode: line.firstNode,
      lastNode: line.lastNode,
      color: line.color,
      linePath: line.linePath,
      allowedVehicles: line.allowedVehicles,
      disallowedVehicles: line.disallowedVehicles,
      allowedDrivers: line.allowedDrivers,
      disallowedDrivers: line.disallowedDrivers,
    } as Line;
  }

  public static toDomain(line: any | Model<ILinePersistence & Document>): Line {
    const pathOrError = Line.create(line, new UniqueEntityID(line.domainID));

    pathOrError.isFailure ? console.log(pathOrError) : '';

    return pathOrError.isSuccess ? pathOrError.getValue() : null;
  }

  public static toPersistence(line: Line): any {
    return {
      domainID: line.id.toString(),
      key: line.key,
      name: line.name,
      firstNode: line.firstNode,
      lastNode: line.lastNode,
      color: line.color,
      linePath: line.linePath,
      allowedVehicles: line.allowedVehicles,
      disallowedVehicles: line.disallowedVehicles,
      allowedDrivers: line.allowedDrivers,
      disallowedDrivers: line.disallowedDrivers,
    };
  }
}
