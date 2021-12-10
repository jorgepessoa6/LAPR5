"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Path = void 0;
const AggregateRoot_1 = require("../core/domain/AggregateRoot");
const Result_1 = require("../core/logic/Result");
class Path extends AggregateRoot_1.AggregateRoot {
    get id() {
        return this._id;
    }
    /*
        get pathID(): PathID {
            return PathID.create(this.id);
        }
        */
    get key() {
        return this.props.key;
    }
    get isEmpty() {
        return this.props.isEmpty;
    }
    get pathNodes() {
        return this.props.pathNodes;
    }
    constructor(props, id) {
        super(props, id);
    }
    static create(pathDTO, id) {
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
        return Result_1.Result.ok(path);
    }
}
exports.Path = Path;
//# sourceMappingURL=path.js.map