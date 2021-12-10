"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TripResult = void 0;
const AggregateRoot_1 = require("../core/domain/AggregateRoot");
const Result_1 = require("../core/logic/Result");
class TripResult extends AggregateRoot_1.AggregateRoot {
    get id() {
        return this._id;
    }
    get time() {
        return this.props.time;
    }
    get noI() {
        return this.props.noI;
    }
    get noF() {
        return this.props.noF;
    }
    get caminho() {
        return this.props.caminho;
    }
    get finalTime() {
        return this.props.finalTime;
    }
    constructor(props, id) {
        super(props, id);
    }
    static create(tripResultDTO, id) {
        const time = tripResultDTO.time;
        const noI = tripResultDTO.noI;
        const noF = tripResultDTO.noF;
        const caminho = tripResultDTO.caminho;
        const finalTime = tripResultDTO.finalTime;
        const tripResult = new TripResult({
            time: time,
            noI: noI,
            noF: noF,
            caminho: caminho,
            finalTime: finalTime
        }, id);
        return Result_1.Result.ok(tripResult);
    }
}
exports.TripResult = TripResult;
//# sourceMappingURL=tripResult.js.map