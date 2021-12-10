import { Document, Model } from 'mongoose';
import driver from '../api/routes/driver';
import { UniqueEntityID } from '../core/domain/UniqueEntityID';
import { Mapper } from '../core/infra/Mapper';
import { INodePersistence } from '../dataschema/INodePersistance';
import INodeDTO  from '../dto/Node/nodeDTO';
import { Node } from '../models/node';
import { NodeID } from '../models/nodeID';


export class NodeMapper extends Mapper<Node>{
    public static toDTO(node: Node): INodeDTO {
        return {
            key:node.key,
            name: node.name,
            latitude: node.latitude,
            longitude: node.longitude,
            shortName: node.shortName,
            isDepot: node.isDepot,
            isReliefPoint: node.isReliefPoint,
            crewTravelTimes: node.crewTravelTimes
        } as INodeDTO;
    }

    public static toDomain(node: any | Model<INodePersistence & Document>): Node {
    const nodeOrError = Node.create(
        node,
        new UniqueEntityID(node.domainId));

    nodeOrError.isFailure ? console.log(nodeOrError) : '';

    return nodeOrError.isSuccess ? nodeOrError.getValue() : null;
}

    public static toPersistence(node: Node): any {
    return {
        domainId: node.id.toString(),
        key:node.key,
        name: node.name,
        latitude: node.latitude,
        longitude: node.longitude,
        shortName: node.shortName,
        isDepot: node.isDepot,
        isReliefPoint: node.isReliefPoint,
        crewTravelTimes: node.crewTravelTimes
    }
}
}