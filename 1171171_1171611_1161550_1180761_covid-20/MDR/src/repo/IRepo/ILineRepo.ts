import { Line } from '../../models/line';
import { LineID } from '../../models/lineID';
import { Repo } from '../../core/infra/Repo';

export default interface ILineRepo extends Repo<Line> {
  save(line: Line): Promise<Line>;
  update(line: Line): Promise<Line>;
  findByDomainId(lineId: LineID | string): Promise<Line>;
  findByKey(keyReq: string): Promise<Line>;
  listByName(): Promise<Line[]>;
  listByCode(): Promise<Line[]>;
  filterByName(key: string): Promise<Line[]>;
  filterCode(keyReq: string): Promise<Line[]>;
}
