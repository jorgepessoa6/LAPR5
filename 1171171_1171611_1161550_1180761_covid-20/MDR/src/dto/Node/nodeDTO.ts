import { UniqueEntityID } from "../../core/domain/UniqueEntityID";
import { CrewTravelTimes } from "../../models/crewTravelTimes";

/* export interface INode {
    _id: string;
    name: string;
    lat: number;
    lon: number;
    shortName: string;
    isDepot: boolean;
    isReliefPoint: boolean;
  } */
export default interface INodeDTO {
  key: string;
  name: string;
  latitude: number;
  longitude: number;
  shortName: string;
  isDepot: boolean;
  isReliefPoint: boolean;
  capacities: Array<any>;
  informationPoint: Array<any>;
  crewTravelTimes: Array<CrewTravelTimes>;
}

