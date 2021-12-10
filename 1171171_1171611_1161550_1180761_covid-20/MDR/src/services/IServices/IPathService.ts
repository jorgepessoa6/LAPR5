import { Result } from "../../core/logic/Result";
import IPathDTO from "../../dto/Path/pathDTO";
import ILineDTO from "../../dto/Line/lineDTO";
import { Path } from "../../models/path";

export default interface IPathService  {
  createPath(pathDTO: IPathDTO): Promise<Result<IPathDTO>>;
  createPathImport(pathDTO: IPathDTO): Promise<Result<IPathDTO>>;
  listByName(): Promise<Path[]>;
  listPathsByLine(key: string): Promise<Path[]>;
  listLinePathsByLine(key: string): Promise<Path[]>;
  /*   updatePath(roleDTO: IPathDTO): Promise<Result<IPathDTO>>;
 */
}
