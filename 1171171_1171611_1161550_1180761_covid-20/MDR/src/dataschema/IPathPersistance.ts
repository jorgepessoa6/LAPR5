import { PathNode } from '../models/pathNode';

export interface IPathPersistence {
  key: string;
  isEmpty: boolean;
  pathNodes: Array<PathNode>;
  }