"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PathNode = void 0;
const Result_1 = require("../core/logic/Result");
const Entity_1 = require("../core/domain/Entity");
class PathNode extends Entity_1.Entity {
    get id() {
        return this._id;
    }
    /*
        get pathNodeID(): PathNodeID {
            return PathNodeID.create(this.id);
        }
        */
    get key() {
        return this.props.key;
    }
    get distance() {
        return this.props.distance;
    }
    get duration() {
        return this.props.duration;
    }
    get node() {
        return this.props.node;
    }
    constructor(props, id) {
        super(props, id);
    }
    static create(pathNodeDTO, id) {
        const key = pathNodeDTO.key;
        const node = pathNodeDTO.node;
        const duration = pathNodeDTO.duration;
        const distance = pathNodeDTO.distance;
        //MELHORAR
        if (duration <= 0 || distance <= 0) {
            return Result_1.Result.fail('Must provide a valid path node');
        }
        else {
            const pathNode = new PathNode({
                key: key,
                node: node,
                duration: duration,
                distance: distance
            }, id);
            return Result_1.Result.ok(pathNode);
        }
    }
}
exports.PathNode = PathNode;
//# sourceMappingURL=pathNode.js.map