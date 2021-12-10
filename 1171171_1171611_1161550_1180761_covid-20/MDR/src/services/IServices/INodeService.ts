import { Result } from "../../core/logic/Result";
import INodeDTO from "../../dto/Node/nodeDTO";
import { Node } from "../../models/node";

export default interface INodeService {
  createNode(nodeDTO: INodeDTO): Promise<Result<INodeDTO>>;
  /*   updateNode(roleDTO: INodeDTO): Promise<Result<INodeDTO>>;
   */
  listByName(): Promise<Node[]>;
  listByCode(): Promise<Node[]>;
  filterByName(key:string): Promise<Node[]>;
  filterCode(keyReq: string): Promise<Node[]>
}
