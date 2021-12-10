"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Node = void 0;
const AggregateRoot_1 = require("../core/domain/AggregateRoot");
const Result_1 = require("../core/logic/Result");
const crewTravelTimes_1 = require("./crewTravelTimes");
class Node extends AggregateRoot_1.AggregateRoot {
    get id() {
        return this._id;
    }
    /*    get nodeID(): NodeID {
           return NodeID.create(this.id);
       }
    */
    get key() {
        return this.props.key;
    }
    get latitude() {
        return this.props.latitude;
    }
    get longitude() {
        return this.props.longitude;
    }
    get isDepot() {
        return this.props.isDepot;
    }
    get name() {
        return this.props.name;
    }
    get isReliefPoint() {
        return this.props.isReliefPoint;
    }
    get shortName() {
        return this.props.shortName;
    }
    get crewTravelTimes() {
        return this.props.crewTravelTimes;
    }
    constructor(props, id) {
        super(props, id);
    }
    static create(nodeDTO, id) {
        const key = nodeDTO.key;
        const name = nodeDTO.name;
        const lat = nodeDTO.latitude;
        const lon = nodeDTO.longitude;
        const isDepot = nodeDTO.isDepot;
        const isReliefPoint = nodeDTO.isReliefPoint;
        const shortName = nodeDTO.shortName;
        const capacities = new Array();
        const informationPoint = new Array();
        var crewTravelTimes = nodeDTO.crewTravelTimes;
        if (crewTravelTimes === undefined || crewTravelTimes === null) {
            crewTravelTimes = [];
        }
        for (let index = 0; index < crewTravelTimes.length; index++) {
            const element = crewTravelTimes_1.CrewTravelTimes.create(crewTravelTimes[index].duration);
            crewTravelTimes.push(element);
        }
        //MELHORAR
        if (!!name === false || name.length === 0) {
            return Result_1.Result.fail('Must provide a node name');
        }
        else {
            const node = new Node({
                key: key,
                name: name,
                latitude: lat,
                longitude: lon,
                isDepot: isDepot,
                isReliefPoint: isReliefPoint,
                shortName: shortName,
                capacities: capacities,
                informationPoint: informationPoint,
                crewTravelTimes: crewTravelTimes
            }, id);
            return Result_1.Result.ok(node);
        }
    }
}
exports.Node = Node;
//# sourceMappingURL=node.js.map