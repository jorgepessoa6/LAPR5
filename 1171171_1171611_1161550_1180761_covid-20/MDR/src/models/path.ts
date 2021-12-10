import mongoose from 'mongoose';
import { AggregateRoot } from '../core/domain/AggregateRoot';
import { Result } from '../core/logic/Result';
import { UniqueEntityID } from "../core/domain/UniqueEntityID";
import { PathID } from './pathID';
import IPathDTO from '../dto/Path/pathDTO';
import { PathNode } from './pathNode';


interface PathProps {
    key: string;
    isEmpty: boolean;
    pathNodes: Array<PathNode>;
}


export class Path extends AggregateRoot<PathProps>{

    get id(): UniqueEntityID {
        return this._id;
    }
    /*
        get pathID(): PathID {
            return PathID.create(this.id);
        }
        */

    get key(): string {
        return this.props.key;
    }

    get isEmpty(): boolean {
        return this.props.isEmpty;
    }

    get pathNodes(): Array<PathNode> {
        return this.props.pathNodes;
    }


    private constructor(props: PathProps, id?: UniqueEntityID
    ) {
        super(props, id);
    }

    public static create(pathDTO: IPathDTO, id?: UniqueEntityID): Result<Path> {
        const key = pathDTO.key;
        const isEmpty = pathDTO.isEmpty;
        const pathNodes = pathDTO.pathNodes;





        /*         //MELHORAR
                console.log(key);
                console.log(pathNodes);
                if (pathNodes.length < 2) {
        
                    return Result.fail<Path>('Must provide a path') */
        /*   } else { */
        const path = new Path({
            key: key,
            isEmpty: isEmpty,
            pathNodes: pathNodes
        }, id);
        return Result.ok<Path>(path)
    }
}
