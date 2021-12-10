import mongoose from 'mongoose';
import { AggregateRoot } from '../core/domain/AggregateRoot';
import { Result } from '../core/logic/Result';
import { UniqueEntityID } from "../core/domain/UniqueEntityID";
import { NodeID } from './nodeID';
import  INodeDTO  from '../dto/Node/nodeDTO';
import { CrewTravelTimes } from './crewTravelTimes';



interface NodeProps {
    key:string;
    name: string;
    latitude: number;
    longitude: number;
    isDepot: boolean;
    isReliefPoint: boolean;
    shortName: string;
    capacities:Array<any>,
    informationPoint:Array<any>,
    crewTravelTimes:Array<CrewTravelTimes>
}


export class Node extends AggregateRoot<NodeProps>{
 
    get id(): UniqueEntityID {
        return this._id;
    }

 /*    get nodeID(): NodeID {
        return NodeID.create(this.id);
    } 
 */
    
    get key(): string {
        return this.props.key;
    }

    get latitude(): number {
        return this.props.latitude;
    }

    get longitude(): number {
        return this.props.longitude;
    }

    get isDepot(): boolean {
        return this.props.isDepot;
    }

    get name(): string {
        return this.props.name;
    }

    get isReliefPoint(): boolean {
        return this.props.isReliefPoint;
    }
    get shortName(): string {
        return this.props.shortName;
    }

    get crewTravelTimes(): CrewTravelTimes[] {
        return this.props.crewTravelTimes;
    }



    private constructor(props: NodeProps, id?: UniqueEntityID
    ) {
        super(props, id);
    }

    public static create(nodeDTO: INodeDTO, id?: UniqueEntityID): Result<Node> {
        const key= nodeDTO.key;
        const name = nodeDTO.name;
        const lat = nodeDTO.latitude;
        const lon = nodeDTO.longitude;
        const isDepot = nodeDTO.isDepot;
        const isReliefPoint = nodeDTO.isReliefPoint;
        const shortName = nodeDTO.shortName;
        const capacities = new Array<any>();
        const informationPoint = new Array<any>();

        var crewTravelTimes = nodeDTO.crewTravelTimes;

        if(crewTravelTimes === undefined || crewTravelTimes === null){
            crewTravelTimes = [];
        }

        for (let index = 0; index < crewTravelTimes.length; index++) {
            const element = CrewTravelTimes.create(crewTravelTimes[index].duration );
            crewTravelTimes.push(element);
        }
 

        //MELHORAR
        if (!!name === false || name.length === 0) {
            return Result.fail<Node>('Must provide a node name')
        } else {
            const node = new Node({
                key:key,
                name: name,
                latitude: lat,
                longitude: lon,
                isDepot: isDepot,
                isReliefPoint: isReliefPoint,
                shortName: shortName,
                capacities:capacities,
                informationPoint:informationPoint,
                crewTravelTimes: crewTravelTimes

            }, id);
            return Result.ok<Node>(node)
        }
    }
} 