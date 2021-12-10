import { Document, Model } from 'mongoose';
import { UniqueEntityID } from '../core/domain/UniqueEntityID';
import { Mapper } from '../core/infra/Mapper';
import { IPathPersistence } from '../dataschema/IPathPersistance';
import  IPathDTO  from '../dto/Path/pathDTO';
import { Path } from '../models/path';
import { PathID } from '../models/pathID';


export class PathMapper extends Mapper<Path>{
    public static toDTO(path: Path): IPathDTO {
        return {
            key:path.key,
            isEmpty : path.isEmpty,
            pathNodes : path.pathNodes
        } as IPathDTO;
    }

    public static toDomain(path: any | Model<IPathPersistence & Document>): Path {
    const pathOrError = Path.create(
        path,
        new UniqueEntityID(path.domainID));

        pathOrError.isFailure ? console.log(pathOrError) : '';

    return pathOrError.isSuccess ? pathOrError.getValue() : null;
}

    public static toPersistence(path: Path): any {
    return {
        domainId: path.id.toString(),
        key:path.key,
        isEmpty: path.isEmpty,
        pathNodes: path.pathNodes
    }
}
}