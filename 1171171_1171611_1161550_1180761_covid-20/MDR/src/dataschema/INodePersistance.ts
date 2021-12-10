export interface INodePersistence {
  key: string;
  name: string;
  latitude: number;
  longitude: number;
  shortName: string;
  isDepot: boolean;
  isReliefPoint: boolean;
  capacities: Array<any>;
  informationPoint: Array<any>;
  crewTravelTimes:Array<any>;
}