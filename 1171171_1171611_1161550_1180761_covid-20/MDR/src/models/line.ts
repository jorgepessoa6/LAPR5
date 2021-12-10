import { AggregateRoot } from '../core/domain/AggregateRoot';
import { Driver } from './driver';
import { LinePath } from './linePath';
import { Result } from '../core/logic/Result';
import { UniqueEntityID } from '../core/domain/UniqueEntityID';
import { VehicleType } from './vehicleType';
import ILineDTO from '../dto/Line/lineDTO';

interface LineProps {
  key: string;
  name: string;
  firstNode: string;
  lastNode: string;
  color: string;
  linePath: Array<LinePath>;
  allowedVehicles: Array<VehicleType>;
  disallowedVehicles: Array<VehicleType>;
  allowedDrivers: Array<Driver>;
  disallowedDrivers: Array<Driver>;
}

export class Line extends AggregateRoot<LineProps> {
  get id(): UniqueEntityID {
    return this._id;
  }

  /*   get lineID(): LineID {
    return LineID.create(this.id);
  } */

  get key(): string {
    return this.props.key;
  }

  get name(): string {
    return this.props.name;
  }

  get firstNode(): string {
    return this.props.firstNode;
  }

  get lastNode(): string {
    return this.props.lastNode;
  }

  get color(): string {
    return this.props.color;
  }

  get linePath(): LinePath[] {
    return this.props.linePath;
  }

  get allowedDrivers(): Driver[] {
    return this.props.allowedDrivers;
  }

  get disallowedDrivers(): Driver[] {
    return this.props.disallowedDrivers;
  }

  get allowedVehicles(): VehicleType[] {
    return this.props.allowedVehicles;
  }

  get disallowedVehicles(): VehicleType[] {
    return this.props.disallowedVehicles;
  }

  private constructor(props: LineProps, id?: UniqueEntityID) {
    super(props, id);
  }

  public static create(lineDTO: ILineDTO, id?: UniqueEntityID): Result<Line> {
    const key = lineDTO.key;
    const name = lineDTO.name;
    const firstNode = lineDTO.firstNode;
    const lastNode = lineDTO.lastNode;
    const color = lineDTO.color;
    const linePath = new Array<LinePath>();
    const allowedDrivers = new Array<Driver>();
    const disallowedDrivers = new Array<Driver>();
    const allowedVehicles = new Array<VehicleType>();
    const disallowedVehicles = new Array<VehicleType>();

    if (!!name === false || name.length === 0) {
      return Result.fail<Line>('Must provide a Line/Key name');
    } else {
      const line = new Line(
        {
          key: key,
          name: name,
          firstNode: firstNode,
          lastNode: lastNode,
          color: color,
          linePath: linePath,
          allowedDrivers: allowedDrivers,
          disallowedDrivers: disallowedDrivers,
          allowedVehicles: allowedVehicles,
          disallowedVehicles: disallowedVehicles,
        },
        id,
      );
      return Result.ok<Line>(line);
    }
  }
  public static createImport(lineDTO: ILineDTO, id?: UniqueEntityID): Result<Line> {
    const key = lineDTO.key;
    const name = lineDTO.name;
    const firstNode = lineDTO.firstNode;
    const lastNode = lineDTO.lastNode;
    const color = lineDTO.color;
    const linePath = lineDTO.linePaths;
    const allowedDrivers = new Array<Driver>();
    const disallowedDrivers = new Array<Driver>();
    const allowedVehicles = new Array<VehicleType>();
    const disallowedVehicles = new Array<VehicleType>();
    if (!!name === false || name.length === 0 || !!key === false || key.length === 0) {
      return Result.fail<Line>('Must provide a Line/Key name');
    } else {
      const line = new Line(
        {
          key: key,
          name: name,
          firstNode: firstNode,
          lastNode: lastNode,
          color: color,
          linePath: linePath,
          allowedDrivers: allowedDrivers,
          disallowedDrivers: disallowedDrivers,
          allowedVehicles: allowedVehicles,
          disallowedVehicles: disallowedVehicles,
        },
        id,
      );
      return Result.ok<Line>(line);
    }
  }
}
