import { PassingTime } from "./PassingTime";

export interface Trip {
    id: string;
    key: string;
    isEmpty: Boolean;
    orientation: string;
    lineKey: string;
    path: string;
    isGenerated: boolean;
    passingTime: PassingTime[];
}