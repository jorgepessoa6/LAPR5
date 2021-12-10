import { LinePath, LinePath2 } from "./linePath";

export interface Line {
    name: string;
    fistNode: string;
    lastNode: string;
    color: string;
    linePath: LinePath2[] ;
}