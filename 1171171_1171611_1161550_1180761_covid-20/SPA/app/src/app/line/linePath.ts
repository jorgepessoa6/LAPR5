import { Direction } from "../path/direction";

export interface LinePath {
    key: string;
    path: string;
    props: propsLinePath;
    orientation: Direction;
  }
 export interface LinePath2 {
    linePath: LinePath[];
}

export interface propsLinePath{
  path: string;
}