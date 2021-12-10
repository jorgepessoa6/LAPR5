import { PathNode } from "./pathNode";

export interface Path {
    key: string,

    isEmpty: Boolean,

    pathNodes: PathNode[];
}