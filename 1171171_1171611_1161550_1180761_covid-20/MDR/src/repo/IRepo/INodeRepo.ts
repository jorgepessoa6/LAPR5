import { Repo } from "../../core/infra/Repo";
import { Node } from "../../models/node";
import { NodeID } from "../../models/nodeID";

export default interface INodeRepo extends Repo<Node> {
  save(node: Node): Promise<Node>;
  findByDomainId (roleId: NodeID | string): Promise<Node>;
  listByName(): Promise<Node[]>;
  listByCode(): Promise<Node[]>;
  filterByName(key:string): Promise<Node[]>;
  filterCode(keyReq: string): Promise<Node[]>
}
