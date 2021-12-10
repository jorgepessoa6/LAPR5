import { Repo } from "../../core/infra/Repo";
import { Path } from "../../models/path";
import { PathID } from "../../models/pathID";

export default interface IPathRepo extends Repo<Path> {
  save(path: Path): Promise<Path>;
  findByDomainId (pathId: PathID | string): Promise<Path>;
  listByName(): Promise<Path[]>;
  findByKey(keyReq: string): Promise<Path>;
}
