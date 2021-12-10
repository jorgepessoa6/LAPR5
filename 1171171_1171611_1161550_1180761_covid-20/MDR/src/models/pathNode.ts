import mongoose from 'mongoose';
import { AggregateRoot } from '../core/domain/AggregateRoot';
import { Result } from '../core/logic/Result';
import { UniqueEntityID } from "../core/domain/UniqueEntityID";
import { PathNodeID } from './pathNodeID';
import { Node } from './node';
import  IPathNodeDTO  from '../dto/Path/pathNodeDTO';
import { Entity } from '../core/domain/Entity';


interface PathNodeProps {
    key: string;
    node: string;
    duration: number;
    distance: number;
    
}


export class PathNode extends Entity<PathNodeProps>{

    get id(): UniqueEntityID {
        return this._id;
    }
/*
    get pathNodeID(): PathNodeID {
        return PathNodeID.create(this.id);
    }
    */

   get key(): string {
    return this.props.key;
    }

    get distance(): number {
        return this.props.distance;
    }

    get duration(): number {
        return this.props.duration;
    }

    get node(): string {
        return this.props.node;
    }


    private constructor(props: PathNodeProps, id?: UniqueEntityID
    ) {
        super(props, id);
    }

    public static create(pathNodeDTO: IPathNodeDTO, id?: UniqueEntityID): Result<PathNode> {
        const key = pathNodeDTO.key;
        const node = pathNodeDTO.node;
        const duration = pathNodeDTO.duration;
        const distance = pathNodeDTO.distance;





        //MELHORAR
        if (duration <= 0 || distance <= 0) {
            return Result.fail<PathNode>('Must provide a valid path node')
        } else {
            const pathNode = new PathNode({
                key: key,
                node: node,
                duration: duration,
                distance: distance

            }, id);
            return Result.ok<PathNode>(pathNode)
        }
    }
} 