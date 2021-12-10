import { Trip } from "../trip/Trip";
import { ITripDTO } from "../trip/TripDTO";

export interface workBlockDTO {
    key: string;
    startTime : number;
    endTime : number;
    startNode : string;
    endNode : string;
    isCrewTravelTime : boolean;
    isActive : boolean;
    trips : string[];
}