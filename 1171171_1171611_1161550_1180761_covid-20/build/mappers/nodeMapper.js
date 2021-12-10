"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NodeMapper = void 0;
const UniqueEntityID_1 = require("../core/domain/UniqueEntityID");
const Mapper_1 = require("../core/infra/Mapper");
const node_1 = require("../models/node");
class NodeMapper extends Mapper_1.Mapper {
    static toDTO(node) {
        return {
            key: node.key,
            name: node.name,
            latitude: node.latitude,
            longitude: node.longitude,
            shortName: node.shortName,
            isDepot: node.isDepot,
            isReliefPoint: node.isReliefPoint,
            crewTravelTimes: node.crewTravelTimes
        };
    }
    static toDomain(node) {
        const nodeOrError = node_1.Node.create(node, new UniqueEntityID_1.UniqueEntityID(node.domainId));
        nodeOrError.isFailure ? console.log(nodeOrError) : '';
        return nodeOrError.isSuccess ? nodeOrError.getValue() : null;
    }
    static toPersistence(node) {
        return {
            domainId: node.id.toString(),
            key: node.key,
            name: node.name,
            latitude: node.latitude,
            longitude: node.longitude,
            shortName: node.shortName,
            isDepot: node.isDepot,
            isReliefPoint: node.isReliefPoint,
            crewTravelTimes: node.crewTravelTimes
        };
    }
}
exports.NodeMapper = NodeMapper;
//# sourceMappingURL=nodeMapper.js.map