import { UniqueEntityID } from "../../core/domain/UniqueEntityID";
import { PathNode } from '../../models/pathNode';

/*export interface IPath {
    id: string;
    isEmpty: boolean;
    pathNodes: Array<PathNode>;
  }
  */
  export default interface IPathDTO {
    idLinha: string;
    linePathID: string;
    orientation: Direction;
    key: string;
    isEmpty: boolean;
    pathNodes: PathNode[];
  }