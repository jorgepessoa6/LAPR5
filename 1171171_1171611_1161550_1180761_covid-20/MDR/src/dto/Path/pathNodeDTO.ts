import { UniqueEntityID } from "../../core/domain/UniqueEntityID";
import { Node } from '../../models/node';
import { PathNode } from '../../models/pathNode';

/*
export interface IPathNode {
    id: string;
    node: Node;
    duration: number;
    distance: number;
  }
  */
  export default interface IPathNodeDTO {
    key: string;
    node: string;
    duration: number;
    distance: number;
  }