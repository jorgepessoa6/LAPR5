"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LinePath = void 0;
const Entity_1 = require("../core/domain/Entity");
const Result_1 = require("../core/logic/Result");
class LinePath extends Entity_1.Entity {
    get key() {
        return this.props.key;
    }
    get path() {
        return this.props.path;
    }
    get orientation() {
        return this.props.orientation;
    }
    constructor(props) {
        super(props);
    }
    static create(pathDTO) {
        const key = pathDTO.linePathID;
        const path = pathDTO.key;
        const orientation = pathDTO.orientation;
        const linePath = new LinePath({
            key: key,
            path: path,
            orientation: orientation,
        });
        return Result_1.Result.ok(linePath);
    }
}
exports.LinePath = LinePath;
//# sourceMappingURL=linePath.js.map