import ILineDTO from '../../dto/Line/lineDTO';
import { Line } from '../../models/line';
import { Result } from '../../core/logic/Result';

export default interface ILineService {
  createLine(lineDTO: ILineDTO): Promise<Result<Line>>;
  createLineImport(lineDTO: ILineDTO): Promise<Result<Line>>;
  listByName(): Promise<Line[]>;
  listByCode(): Promise<Line[]>;
  filterByName(key:string): Promise<Line[]>;
  filterCode(keyReq: string): Promise<Line[]>
}
