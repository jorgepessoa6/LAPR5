import { Trip } from "../trip/Trip";

export interface WorkBlock {
    key: String,

    startTime: Number,

    endTime: Number,

    startNode: String,

    endNode: String,

    isCrewTravelTime: Boolean,

    isActive: Boolean,

    trips: Trip[];
}